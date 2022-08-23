import styles from "../../AlbumsListCard/AlbumsListCard.module.scss";
import mobileStyles from './AlbumsListCardMobile.module.scss'
import Image from "next/image";
import Link from "next/link";
const AlbumsListCardMobile = ({ title, newPrice, oldPrice, previewUrl, slug, className}) => {
  return (
    <Link href={`/albums/${slug}`}>
      <div className={styles.albumWrapper}>
        <div className={`${className} ${mobileStyles.imgWrapper}`}>
          <Image
            layout="fill"
            src={previewUrl}
            className={styles.albumImg}
            draggable={false}
          />
        </div>
        <div className={mobileStyles.infoWrapper}>
          <h3 className={styles.hover}>{title}</h3>
          <div className={mobileStyles.priceWrapper}>
            <p className={`${styles.hover} ${mobileStyles.newPrice}`}>
              {newPrice} рублей
            </p>
            {oldPrice ? (
              <p className={`${styles.hover} ${mobileStyles.oldPrice}`}>
                {oldPrice} рублей
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlbumsListCardMobile;
