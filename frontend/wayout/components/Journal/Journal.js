import config from "config";
import wayoutAPI from "services/wayoutApi";
import { useEffect, useState } from "react";
import styles from "./Journal.module.scss";
import { default as ExpImage } from "next/future/image";
import RoundSendButton from "../UI/RoundSendButton";
import MainTitle from "../UI/MainTitle";
import Link from "next/link";
import clientsStyles from "../UI/Clients/Clients.module.scss";
import Card from "./Card";
import FadeIn from "../UI/Animations/";

const Journal = () => {
  const [data, setData] = useState([]);
  const [head, setHead] = useState({});

  const casesApiUrl = "/posts/cases/";
  const articlesApiUrl = "/posts/articles/";

  useEffect(() => {
    let percentages = [20, 20, 56, 20, 56, 20, 48, 48];

    if (window.innerWidth < 1650)
      percentages = [23, 23, 49, 23, 49, 23, 49, 49];

    if (window.innerWidth < 1280)
      percentages = [33, 64, 64, 33, 33, 64, 64, 33];

    if (window.innerWidth < 800)
      percentages = [49, 49, 100, 49, 49, 100, 49, 49];

    const fetchData = async () => {
      let resData = [];
      const casesResponse = await wayoutAPI.get(casesApiUrl);
      const articlesResponse = await wayoutAPI.get(articlesApiUrl);
      casesResponse.data.map(({ value }) => {
        resData.push({ ...value, type: "cases" });
      });
      articlesResponse.data.map(({ value }) => {
        resData.push({ ...value, type: "articles" });
      });
      let index = resData.findIndex((obj) => obj.slug == "obama");
      setHead(resData[index]);
      if (index >= 0) resData.splice(index, 1);
      resData.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      for (let i = 0; i <= resData.length; i += 8) {
        resData
          .slice(i, i + 8)
          .map((obj, index) => (obj.width = percentages[index]));
      }
      setData(resData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.header}>
        <FadeIn>
          <div className={styles.imgWrapper}>
            <ExpImage
              className={styles.headerImg}
              layout="fill"
              src={"/static/img/journal_background.jpg"}
              width={1600}
              height={632}
            />
          </div>
        </FadeIn>
        <div className={styles.headerText}>
          <MainTitle
            className={styles.title}
            color={false}
            text={head ? head.title : "Тут пустота"}
          />
          <FadeIn>
            <Link href={`/journal/cases/${head ? head.slug : "empty"}`}>
              <div className={`${clientsStyles.moreWrapper} ${styles.more}`}>
                <p className={clientsStyles.moreText}>Смотреть подробнее</p>
                <ExpImage
                  className={`${clientsStyles.moreImg} ${styles.arrow}`}
                  width={60}
                  height={28}
                  src={"/static/img/white_arrow.svg"}
                  layout="raw"
                />
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
      <FadeIn>
        <div className={styles.content}>
          {data.map(({ title, id, width, type, slug }) => {
            return (
              <Card
                key={`${id}${title}`}
                title={title}
                filePath={`${config.apiUrl}/files/${type}/${id}/0/`}
                width={width}
                link={`/journal/${type}/${slug}`}
              />
            );
          })}
          <RoundSendButton value={"Заказать съемку"} className={styles.btn} />
        </div>
      </FadeIn>
    </>
  );
};

export default Journal;
