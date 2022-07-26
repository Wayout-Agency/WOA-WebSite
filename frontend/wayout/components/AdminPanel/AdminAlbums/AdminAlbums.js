import styles from "./AdminAlbums.module.scss";
import panelStyles from "../AdminPanel.module.scss";

import Products from "./Products";
const AdminAlbums = () => {
  return (
    <div className={styles.albumsWrapper}>
      <h2 className={panelStyles.title}>Альбомы</h2>
      <Products
        productTitle="Товары"
        productType="Карточку"
        productApiUrl="/albums/"
        productUrl="/card"
      />
      <Products
        productTitle="Вопросы"
        productType="Вопрос"
        productApiUrl="/questions-services/"
        productUrl="/question"
        responseType="question"
      />
      <Products
        productTitle="Доп. услуги"
        productType="Услугу"
        productApiUrl="/questions-services/"
        productUrl="/service"
        responseType="service"
      />
    </div>
  );
};
export default AdminAlbums;
