import styles from "../ArticleCard.module.scss";
import Image from "next/image";
import config from "config";
import VideoPlayer from "@/components/UI/VideoPlayer";

const Block = ({ id, caption, subtitle, text, fileId }) => {
  const getFile = () => {
    const videoTypes = ["mp4", "mov"];
    let xhr = new XMLHttpRequest();
    xhr.open(
      "OPTIONS",
      `${config.apiUrl}/files/articles/${id}/${fileId}/`,
      false
    );
    xhr.send();
    return videoTypes.includes(JSON.parse(xhr.response).extension);
  };

  return (
    <div className={styles.block}>
      <div className={styles.fileWrapper}>
        {getFile() ? (
          <VideoPlayer
            filePath={`${config.apiUrl}/files/articles/${id}/${fileId}/`}
            fullSize={false}
          />
        ) : (
          <div className={styles.imgWrapper}>
            <Image
              layout="fill"
              src={`${config.apiUrl}/files/articles/${id}/${fileId}/`}
              className={styles.img}
            />
          </div>
        )}
        <p className={`${styles.text} ${styles.caption}`}> — {caption}</p>
      </div>
      <div className={`${styles.textWrapper} ${styles.top50}`}>
        <h2>{subtitle}</h2>
        <p className={`${styles.text} ${styles.subText}`}>{text}</p>
      </div>
    </div>
  );
};
export default Block;
