import styles from "./Main.module.scss";
import MainTitle from "../UI/MainTitle/";
import VideoPlayer from "../UI/VideoPlayer";
import Clients from "../UI/Clients";
import LeadCatch from "./LeadCatch";
import MainAlbumsList from "./MainAlbumsList";
import Graduation from "./Graduation";
import Journal from "./Journal";
import FadeIn from "../UI/Animations/";
import Link from "next/link";
const Main = () => {
  return (
    <>
      <MainTitle
        text={
          <span>
            Мы делаем школьные <Link href='/albums'><span className={styles.underline}>альбомы</span></Link>{" "}
            и организуем <Link href='/graduations'><span className={styles.underline}>выпускные</span></Link>
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
          <Journal />
        </>
      </FadeIn>
    </>
  );
};

export default Main;
