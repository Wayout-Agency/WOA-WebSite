import styles from "./AlbumsCard.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import { rootWayoutAPI } from "services/wayoutApi";
import useSWR from "swr";
import AdminForm from "@/components/UI/AdminForm";

const AlbumsCard = () => {
  const albumsApiUrl = "/albums/";

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Добавление/ред. карточки</h2>
      <AdminForm
        required_data={[
          { placeholder: "Название", name: "title" },
          { placeholder: "Лох", name: "title" },
        ]}
        optional_data={[{ inputs: [], title: "Обложки" }]}
        blockSample={(i) => {
          return [
            { placeholder: `Обложка ${i}*`, name: "title" },
            { type: "file", placeholder: `Файл ${i}*` },
          ];
        }}
      />
    </div>
  );
};
export default AlbumsCard;
