import styles from "./AdminAlbumsCard.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";

const AdminAlbumsCard = () => {
  const albumsApiUrl = "/albums/";

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Добавление/ред. карточки</h2>
    </div>
  );
};
export default AdminAlbumsCard;
