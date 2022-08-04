import albumsStyles from "../Albums.module.scss";
import Link from "next/link";

const Products = ({ productTitle, productType, productUrl, data }) => {
  return (
    <div className={albumsStyles.albumsDataWrapper}>
      {productTitle ? (
        <h3 className={albumsStyles.dataTitle}>{productTitle}</h3>
      ) : (
        <></>
      )}
      <div className={albumsStyles.actionsWrapper}>
        <div>
          <p className={albumsStyles.actionsTitle}>Добавить</p>
          <p className={albumsStyles.currentDataTitle}>Текущие</p>
        </div>
        <div className={albumsStyles.currentDataWrapper}>
          <Link href={productUrl}>
            <a className={albumsStyles.actionLink}>{productType}</a>
          </Link>
          {data.map(({ title, id }) => {
            return (
              <Link key={id} href={`${productUrl}/${id}`}>
                <a className={albumsStyles.productLink}>{title}</a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Products;
