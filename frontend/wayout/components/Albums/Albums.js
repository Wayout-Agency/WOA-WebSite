import styles from "./Albums.module.scss";
import MainTitle from "../UI/MainTitle";
import Clients from "../UI/Clients";
import AlbumsList from "../UI/AlbumsList";
import QuestionServices from "../UI/QuestionServices";
import Process from "./Process";
import FadeIn from "../UI/Animations/";
import { useState, useEffect } from "react";

const Albums = () => {
  const [width, setWidth] = useState(0);
  const breakpoint = 800;

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  return (
    <>
      <MainTitle text={"Альбомы"} />
      <FadeIn>
        <>
          <div className={styles.albumsListWrapper}>
            {<AlbumsList mobile={width > breakpoint ? false : true} />}
          </div>
          <div className={styles.QSWrapper}>
            <QuestionServices QSType="question" />
          </div>
          <div className={styles.clientsWrapper}>
            <Clients />
          </div>
          <Process />
        </>
      </FadeIn>
    </>
  );
};
export default Albums;
