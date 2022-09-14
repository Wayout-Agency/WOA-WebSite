import styles from "../ArticleCard.module.scss";
import Image from "next/image";
import config from "config";
import VideoPlayer from "@/components/UI/VideoPlayer";

const Block = ({ id, caption, subtitle, text, fileId }) => {
  const getFile = () => {
    const videoTypes = ["mp4", "mov", "webm"];
    let xhr = new XMLHttpRequest();
    xhr.open(
      "OPTIONS",
      `${config.apiUrl}/files/articles/${id}/${fileId}/`,
      false
    );
    xhr.send();
    if (xhr.status === 400) {
      return "nf";
    }
    if (videoTypes.includes(JSON.parse(xhr.response).extension)) {
      return "fv";
    }
    return "fi";
  };
  const file = getFile();
  return (
    <div className={styles.block} style={file === "nf" ? { marginTop: 0 } : null}>
      {file === "nf" ? (
        <></>
      ) : file === "fv" ? (
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
            alt={`article-img-${fileId}`}
          />
        </div>
      )}
      {caption ? (
        <p className={`${styles.text} ${styles.caption}`}> — {caption}</p>
      ) : (
        <></>
      )}
      <div
        className={`${styles.textWrapper} ${styles.top50}`}
        style={!subtitle ? { marginTop: 0 } : null}
      >
        {subtitle ? <h2>{subtitle}</h2> : <></>}
        {text ? (
          <p className={`${styles.text} ${styles.subText}`}>{text}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Block;
