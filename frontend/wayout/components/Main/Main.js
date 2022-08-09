import useSWR from "swr";
import styles from "./Main.module.scss";
import wayoutAPI from "services/wayoutApi";
import MainTitle from "../UI/MainTitle/";
import VideoPlayer from "../UI/VideoPlayer";

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
    </>
  );
};

export default Main;
