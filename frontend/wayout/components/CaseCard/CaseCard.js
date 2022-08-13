import styles from "./CaseCard.module.scss";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import Image from "next/future/image";
import MainTitle from "../UI/MainTitle";
import RoundSendButton from "../UI/RoundSendButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import config from "config";
import Journal from "../Main/Journal";
import { useRouter } from "next/router";

const CaseCard = ({ slug }) => {
  const router = useRouter();
  const caseApiUrl = slug ? `/posts/cases/${slug}/` : null;

  const fetcher = async () => {
    const response = await wayoutAPI.get(caseApiUrl);
    return response.data;
  };

  const copyText = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href).catch((err) => {
      console.log("Something went wrong", err);
    });
  };

  const { data, error } = useSWR(caseApiUrl, fetcher);

  if (error && error.status === 404) router.push("/404");

  return data ? (
    <>
      <MainTitle text={data.value.title} description={data.value.description} />
      <div className={styles.mainImgWrapper}>
        <Image
          src={`${config.apiUrl}/files/cases/${data.value.id}/0/`}
          layout="fill"
          className={`${styles.mainImg} ${styles.img}`}
          width={1600}
          height={775}
          priority={true}
        />
      </div>
      <div className={styles.textWrapper}>
        <h2>Задача</h2>
        <p className={styles.text}>{data.value.task}</p>
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={`${config.apiUrl}/files/cases/${data.value.id}/1/`}
          layout="fill"
          className={styles.img}
          width={1600}
          height={775}
          priority={true}
        />
      </div>
      <div className={`${styles.imgWrapper} ${styles.verticalWrapper}`}>
        <Image
          src={`${config.apiUrl}/files/cases/${data.value.id}/2/`}
          layout="fill"
          className={`${styles.img} ${styles.vertImg}`}
          width={720}
          height={1015}
          priority={true}
        />
        <Image
          src={`${config.apiUrl}/files/cases/${data.value.id}/3/`}
          layout="fill"
          className={`${styles.img} ${styles.vertImg}`}
          width={720}
          height={1015}
          priority={true}
        />
      </div>
      <div className={styles.sliderWrapper}></div>
      <div className={styles.textWrapper}>
        <h2>Процесс</h2>
        <p className={styles.text}>{data.value.process}</p>
      </div>
      <div className={styles.imgWrapper}>
        <Image
          src={`${config.apiUrl}/files/cases/${data.value.id}/5/`}
          layout="fill"
          className={styles.img}
          width={1600}
          height={775}
          priority={true}
        />
      </div>
      <div className={styles.btnWrapper}>
        <RoundSendButton value={"Хочу такую же съемку"} />
        <div className={styles.dateShareWrapper}>
          <p className={styles.dateShareText}>
            {data.value.created_at.slice(8) +
              "." +
              data.value.created_at.slice(5, 7) +
              "." +
              data.value.created_at.slice(0, 4)}
          </p>
          <a href="" className={styles.dateShareText} onClick={copyText}>
            Поделиться кейсом
          </a>
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <Journal
          journalTitle="Рекомендации"
          postUrl={`/posts/cases/?quantity=3&exclude=${slug}`}
          link={"cases"}
        />
      </div>
    </>
  ) : (
    <Skeleton width={"100%"} height={"100vh"} borderRadius={15} />
  );
};
export default CaseCard;
