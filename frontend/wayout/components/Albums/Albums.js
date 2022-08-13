import styles from "./Albums.module.scss";
import MainTitle from "../UI/MainTitle";
import Clients from "../UI/Clients";
import AlbumsList from "../UI/AlbumsList";
import QuestionServices from "../UI/QuestionServices";

const Albums = () => {
  return (
    <>
      <MainTitle text={"Альбомы"} />
      <div className={styles.albumsListWrapper}>
        <AlbumsList />
      </div>
      <div className={styles.QSWrapper}>
        <QuestionServices QSType="question" />
      </div>
    </>
  );
};
export default Albums;
