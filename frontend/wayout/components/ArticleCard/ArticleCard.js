import styles from "./ArticleCard.module.scss";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Journal from "../Main/Journal";
import { useRouter } from "next/router";
import Block from "./Block";
import FadeIn from "../UI/Animations/";
const ArticleCard = ({ slug }) => {
  const router = useRouter();
  const caseApiUrl = slug ? `/posts/articles/${slug}/` : null;

  const fetcher = async () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      timezone: "UTC",
    };
    const response = await wayoutAPI.get(caseApiUrl);
    const ruDate = new Date(response.data.value.created_at).toLocaleString(
      "ru",
      options
    );
    response.data.value.blocks = JSON.parse(response.data.value.blocks);
    response.data.value.created_at = ruDate.slice(0, ruDate.length - 3);
    return response.data.value;
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
    <FadeIn>
      <>
        <div className={styles.articleContainer}>
          <div className={`${styles.header} ${styles.top50}`}>
            <h2>{data.title}</h2>
            <div className={styles.articleInfo}>
              <p className={styles.text}>{data.author}</p>
              <p className={styles.text}>~{data.time_to_read} мин</p>
              <p className={styles.text}>{data.created_at}</p>
            </div>
            <div className={`${styles.introduction} ${styles.top50}`}>
              <p className={styles.text}>{data.introduction}</p>
            </div>
          </div>
          <div className={`${styles.content} ${styles.top50}`}>
            {data.blocks.map(({ video_caption, subtitle, text }, index) => {
              return (
                <Block
                  caption={video_caption}
                  subtitle={subtitle}
                  text={text}
                  id={data.id}
                  fileId={index}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.recWrapper}>
          <Journal
            journalTitle="Рекомендации"
            postUrl={`/posts/articles/?quantity=3&exclude=${slug}`}
          />
        </div>
      </>
    </FadeIn>
  ) : (
    <Skeleton width={"100%"} height={900} borderRadius={15} />
  );
};

export default ArticleCard;
