import styles from "./MainAlbumsList.module.scss";
import AlbumsList from "@/components/UI/AlbumsList";
import Image from "next/future/image";
import Link from "next/link";

const MainAlbumsList = () => {
  return (
    <div className={styles.mainAlbumsListWrapper}>
      <Link href={"/albums/"}>
        <div className={styles.mainAlbumsListHeader}>
          <h2 className={styles.title}>Альбомы</h2>
          <Image
            className={styles.img}
            width={66}
            height={28}
            src={"/static/img/arrow.svg"}
            layout="raw"
            alt="arrow"
          />
        </div>
      </Link>
      <AlbumsList />
    </div>
  );
};

export default MainAlbumsList;
