import styles from "./Main.module.scss";
import MainTitle from "../UI/MainTitle/";
import VideoPlayer from "../UI/VideoPlayer";
import Clients from "../UI/Clients";
import LeadCatch from "./LeadCatch";
import MainAlbumsList from "./MainAlbumsList";
import Graduation from "./Graduation";
import Journal from "./Journal";
import FadeIn from "../UI/Animations/";
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
      <FadeIn>
        <VideoPlayer filePath={"/static/video/main.mp4"} autoPlay={true} />
      </FadeIn>
      <FadeIn>
        <>
          <LeadCatch />
          <MainAlbumsList />
          <Clients />
          <Graduation />
          <Journal />
        </>
      </FadeIn>
    </>
  );
};

export default Main;
