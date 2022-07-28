import styles from "./AdminAlbums.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";

import Products from "./Products";
const AdminAlbums = () => {
  const albumsApiUrl = "/albums/";
  const questionServicesApiUrl = "/questions-services/";

  const albumsFetcher = async () => {
    let albums = await wayoutAPI.get(albumsApiUrl);
    return albums.data;
  };

  const questionServicesFetcher = async () => {
    let questionServices = await wayoutAPI.get(questionServicesApiUrl);
    return {
      questions: questionServices.data.filter(
        ({ type }) => type === "question"
      ),
      services: questionServices.data.filter(({ type }) => type === "service"),
    };
  };

  const albums = useSWR(albumsApiUrl, albumsFetcher);
  
  const questionServices = useSWR(
    questionServicesApiUrl,
    questionServicesFetcher
  );

  if (!(albums.data && questionServices.data)) return <></>;

  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Альбомы</h2>
      <Products
        productTitle="Товары"
        productType="Карточку"
        productUrl="/admin/albums/card"
        data={albums.data}
      />
      <Products
        productTitle="Вопросы"
        productType="Вопрос"
        productUrl="/admin/albums/question"
        responseType="question"
        data={questionServices.data.questions}
      />
      <Products
        productTitle="Доп. услуги"
        productType="Услугу"
        productUrl="/admin/albums/service"
        responseType="service"
        data={questionServices.data.services}
      />
    </div>
  );
};
export default AdminAlbums;
