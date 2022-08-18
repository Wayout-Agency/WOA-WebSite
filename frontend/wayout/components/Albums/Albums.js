import styles from "./Albums.module.scss";
import MainTitle from "../UI/MainTitle";
import Clients from "../UI/Clients";
import AlbumsList from "../UI/AlbumsList";
import QuestionServices from "../UI/QuestionServices";
import Process from "./Process";
import FadeIn from "../UI/Animations/";
const Albums = () => {
  return (
    <>
      <MainTitle text={"Альбомы"} />
      <FadeIn>
        <>
          <div className={styles.albumsListWrapper}>
            <AlbumsList />
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
