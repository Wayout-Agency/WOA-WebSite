import styles from "../../AdminPanel.module.scss";
import Link from "next/link";

const Products = ({ productTitle, productType, productUrl, data }) => {
  return (
    <div className={styles.albumsDataWrapper}>
      {productTitle ? (
        <h3 className={styles.dataTitle}>{productTitle}</h3>
      ) : (
        <></>
      )}
      <div className={styles.actionsWrapper}>
        <div>
          <p className={styles.actionsTitle}>Добавить</p>
          <p className={styles.currentDataTitle}>Текущие</p>
        </div>
        <div className={styles.currentDataWrapper}>
          <Link href={productUrl}>
            <a className={styles.actionLink}>{productType}</a>
          </Link>
          {data.map(({ title, id }) => {
            return (
              <Link key={id} href={`${productUrl}/${id}`}>
                <a className={styles.productLink}>{title}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Products;
