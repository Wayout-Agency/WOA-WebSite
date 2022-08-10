import styles from "./Main.module.scss";
import MainTitle from "../UI/MainTitle/";
import VideoPlayer from "../UI/VideoPlayer";
import LeadCatch from "./LeadCatch";
const Main = () => {
  return (
    <>
      <MainTitle
        text={
          <span>
            Мы делаем школьные <span className={styles.underline}>альбомы</span>{" "}
            и организуем <span className={styles.underline}>выпускные</span>
          </span>
        }
      />
      <VideoPlayer filename={"main.mp4"} autoPlay={true} />
      <LeadCatch />
    </>
  );
};

export default Main;
