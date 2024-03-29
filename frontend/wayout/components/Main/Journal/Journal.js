import styles from "./Journal.module.scss";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { default as ImageRaw } from "next/future/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import config from "config";
import clientsStyles from "../../UI/Clients/Clients.module.scss";
const Journal = ({
  journalTitle = "Журнал",
  postUrl = "/posts/articles/?quantity=3",
  link = "articles",
}) => {
  const articlesApiUrl = postUrl;

  const fetcher = async () => {
    const response = await wayoutAPI.get(articlesApiUrl);
    return response.data;
  };
  const { data } = useSWR(articlesApiUrl, fetcher);

  return (
    <div className={styles.journalWrapper}>
      <Link href={"/magazine/"}>
        <div className={styles.journalHeader}>
          <h2 className={styles.title}>{journalTitle}</h2>
          <ImageRaw
            className={clientsStyles.img}
            width={66}
            height={28}
            src={"/static/img/arrow.svg"}
            layout="raw"
            alt="arrow"
          />
        </div>
      </Link>
      {data && data.length > 2 ? (
        <div className={styles.articlesWrapper}>
          <Link href={`/magazine/${link}/${data[0].value.slug}`}>
            <div className={styles.bigImgWrapper}>
              <div className={styles.imgWrapper} style={{ height: 500 }}>
                <Image
                  layout="fill"
                  src={`${config.apiUrl}/files/${link}/${data[0].value.id}/0/`}
                  className={styles.img}
                  alt="big-journal-img"
                />
              </div>
              <h3 className={styles.postTitile}>
                {data[0].value.title}
                <br />
                <span className={styles.span}>
                  {data[0].value.created_at.slice(8) +
                    "." +
                    data[0].value.created_at.slice(5, 7) +
                    ".22"}
                </span>
              </h3>
            </div>
          </Link>
          <div className={styles.smallImgWrapper}>
            {data.slice(1, 3).map(({ value }) => {
              return (
                <Link href={`/magazine/${link}/${value.slug}`} key={value.id}>
                  <div className={styles.smallImgItemWrapper}>
                    <div
                      className={styles.imgSWrapper}
                      style={{ width: 183, height: 164 }}
                    >
                      <Image
                        layout="fill"
                        src={`${config.apiUrl}/files/${link}/${value.id}/0/`}
                        className={styles.img}
                        alt={`small-journal-img-${value.id}`}
                      />
                    </div>
                    <h3 className={styles.smallImgTitle}>
                      {value.title}
                      <br />
                      <span className={styles.span}>
                        {value.created_at.slice(8) +
                          "." +
                          value.created_at.slice(5, 7) +
                          "." +
                          value.created_at.slice(2, 4)}
                      </span>
                    </h3>
                  </div>
                </Link>
              );
            })}
            <Link href={"/magazine/"}>
              <div
                className={`${clientsStyles.moreWrapper} ${styles.moreWrapper}`}
                style={{ marginTop: 100 }}
              >
                <p className={clientsStyles.moreText}>Читать больше</p>
                <ImageRaw
                  className={`${clientsStyles.moreImg} ${styles.moreImg}`}
                  width={66}
                  height={28}
                  src={"/static/img/arrow.svg"}
                  layout="raw"
                  alt="arrow"
                />
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <Skeleton height={600} borderRadius={15} width={"100%"} />
      )}
    </div>
  );
};

export default Journal;
