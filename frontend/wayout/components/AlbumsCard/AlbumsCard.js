import styles from "./AlbumsCard.module.scss";
import Image from "next/image";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import config from "config";
import RoundSendButton from "../UI/RoundSendButton";
import { useState } from "react";
import Slider from "../UI/Slider";

const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const AlbumsCard = ({ type }) => {
  const albumUrl = `albums/${type}/`;
  const [carouselIds, setCarouselIds] = useState([]);
  const fetchAlbum = async (url) => {
    const album = await wayoutAPI.get(url);
    const coversIds = [1].concat(range(4, album.data.separation));
    const photoesIds = [2].concat(
      range(album.data.separation, album.data.files_quantity)
    );
    setCarouselIds([coversIds[0]].concat(photoesIds));
    return album.data;
  };
  const { data, _ } = useSWR(albumUrl, (albumUrl) => fetchAlbum(albumUrl));
  if (!data) return <></>;

  const filesUrl = `${config.apiUrl}/files/albums/${data.id}/`;
  const coversIds = [1].concat(range(4, data.separation));
  const photoesIds = [2].concat(range(data.separation, data.files_quantity));

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.previewLeft}>
        <h2 className={styles.title}>{data.title}</h2>
        <p className={`${styles.desc} ${styles.text}`}>{data.description}</p>
        <h3 className={styles.text}>Обложка</h3>
        <div className={styles.coversWrapper}>
          {coversIds.map((id) => {
            return (
              <div className={styles.coverWrapper} key={id}>
                <Image
                  src={`${filesUrl}${id}`}
                  onClick={() => {
                    setCarouselIds([id].concat(photoesIds));
                  }}
                  className={styles.cover}
                  draggable={false}
                  layout="fill"
                />
              </div>
            );
          })}
        </div>
        <div className={styles.pricesWrapper}>
          <p className={styles.price}>{data.new_price} рублей</p>
          {data.old_price ? (
            <p className={`${styles.price} ${styles.oldPrice}`}>
              {data.old_price} рублей
            </p>
          ) : null}
        </div>
        {data.sale_text ? (
          <p className={styles.saleText}>{data.sale_text}</p>
        ) : null}
        <RoundSendButton value="Заказать" />
      </div>
      <div>
        <Slider
          imgIndexes={carouselIds}
          filesUrl={filesUrl}
          width={700}
          height={715}
          preloadIndexes={coversIds.slice(1)}
        />
      </div>
    </div>
  );
};

export default AlbumsCard;
