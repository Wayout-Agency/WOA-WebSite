import styles from "./AlbumsList.module.scss";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AlbumsListCard from "./AlbumsListCard";
import config from "config";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const AlbumsList = () => {
  const albumsApiUrl = "/albums/";

  const fetcher = async () => {
    let response = await wayoutAPI.get(albumsApiUrl);
    return response.data;
  };

  const { data, error } = useSWR(albumsApiUrl, fetcher);

  if (error) throw "Error";

  return data ? (
    <Swiper
      className={styles.albumsListWrapper}
      slidesPerView={"auto"}
      spaceBetween={33}
    >
      {data.map((album) => {
        return (
          <SwiperSlide className={styles.slide} key={album.id}>
            <AlbumsListCard
              title={album.title}
              oldPrice={album.old_price}
              newPrice={album.new_price}
              previewUrl={`${config.apiUrl}/files/albums/${album.id}/0/`}
              slug={album.slug}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    <Skeleton width={"100%"} height={490} style={{ borderRadius: "15px" }} />
  );
};

export default AlbumsList;
