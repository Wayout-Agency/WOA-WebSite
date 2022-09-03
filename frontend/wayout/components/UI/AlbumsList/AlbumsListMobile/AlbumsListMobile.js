import styles from "./AlbumsListMobile.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AlbumsListMobileCard from "./AlbumsListCardMobile";
import config from "config";

const AlbumsList = ({ data }) => {
  return data ? (
    <div className={styles.albumsListWrapper}>
      {data.map((album) => {
        return (
            <AlbumsListMobileCard
              title={album.title}
              oldPrice={album.old_price}
              newPrice={album.new_price}
              previewUrl={`${config.apiUrl}/files/albums/${album.id}/0/`}
              slug={album.slug}
              className={styles.card}
              key={album.id}
            />
        );
      })}
    </div>
  ) : (
    <Skeleton width={"100%"} height={490} style={{ borderRadius: "15px" }} />
  );
};

export default AlbumsList;
