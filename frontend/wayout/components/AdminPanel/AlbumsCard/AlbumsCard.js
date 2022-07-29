import styles from "./AlbumsCard.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";

const AlbumsCard = () => {
  const albumsApiUrl = "/albums/";

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Добавление/ред. карточки</h2>
    </div>
  );
};
export default AlbumsCard;
