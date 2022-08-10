import styles from "./AlbumsListCard.module.scss";
import Image from "next/image";
import Link from "next/link";
const AlbumsListCard = ({ title, newPrice, oldPrice, previewUrl, slug }) => {
  return (
    <Link href={`/albums/${slug}`}>
      <div className={styles.albumWrapper}>
        <div className={styles.imgWrapper}>
          <Image
            layout="fill"
            src={previewUrl}
            className={styles.albumImg}
            draggable={false}
          />
        </div>
        <div className={styles.infoWrapper}>
          <h3 className={styles.hover}>{title}</h3>
          <div className={styles.priceWrapper}>
            <p className={`${styles.hover} ${styles.newPrice}`}>
              {newPrice} рублей
            </p>
            {oldPrice ? (
              <p className={`${styles.hover} ${styles.oldPrice}`}>
                {oldPrice} рублей
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlbumsListCard;