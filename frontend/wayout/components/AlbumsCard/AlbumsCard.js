import styles from "./AlbumsCard.module.scss";
import Image from "next/image";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import config from "config";
import RoundSendButton from "../UI/RoundSendButton";
import { useState, useEffect } from "react";
import Slider from "../UI/Slider";
import VideoPlayer from "../UI/VideoPlayer";
import QuestionServices from "../UI/QuestionServices";
import Skeleton from "react-loading-skeleton";
import FadeIn from "../UI/Animations/";

const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const AlbumsCard = ({ type }) => {
  const albumUrl = `albums/${type}/`;
  const [media, setMedia] = useState({
    filesUrl: "",
    coversIds: [],
    photoesIds: [],
    carouselIds: [],
  });
  const fetchAlbum = async () => {
    const album = await wayoutAPI.get(albumUrl);
    return album.data;
  };
  const { data, _ } = useSWR(albumUrl, fetchAlbum);

  useEffect(() => {
    if (data) {
      const filesUrl = `${config.apiUrl}/files/albums/${data.id}/`;
      const coversIds = [1].concat(range(4, data.separation));
      const photoesIds = [2].concat(
        range(data.separation, data.files_quantity)
      );
      const carouselIds = [coversIds[0]].concat(photoesIds);
      setMedia({
        filesUrl: filesUrl,
        coversIds: coversIds,
        photoesIds: photoesIds,
        carouselIds: carouselIds,
      });
    }
  }, [data]);
  return (
    <div className={styles.mainWrapper}>
      <FadeIn>
        <div className={styles.preview}>
          <div className={styles.previewLeft}>
            {data ? (
              <>
                <h2 style={{ marginBottom: "7px" }}>{data.title}</h2>
                <h3 className={styles.desc}>{data.description}</h3>
              </>
            ) : (
              <>
                <h2 style={{ marginBottom: "7px" }}>
                  <Skeleton borderRadius={15} width="50%" />
                </h2>
                <h3 className={styles.desc}>
                  <Skeleton borderRadius={15} count={3} />
                </h3>
              </>
            )}
            <h3>Обложка</h3>
            <div className={styles.coversWrapper}>
              {data ? (
                media.coversIds.map((id) => {
                  return (
                    <div className={styles.coverWrapper} key={id}>
                      <Image
                        src={`${media.filesUrl}${id}`}
                        onClick={() => {
                          setMedia({
                            ...media,
                            carouselIds: [id].concat(media.photoesIds),
                          });
                        }}
                        className={styles.cover}
                        draggable={false}
                        layout="fill"
                      />
                    </div>
                  );
                })
              ) : (
                <div style={{ display: "flex" }}>
                  <Skeleton
                    width="50px"
                    height="50px"
                    circle={true}
                    style={{ marginRight: "15px" }}
                    count={3}
                    inline={true}
                  />
                </div>
              )}
            </div>
            <div className={styles.pricesWrapper}>
              {data ? (
                <>
                  <h2>{data.new_price} рублей</h2>
                  {data.old_price ? (
                    <h2 className={styles.oldPrice}>{data.old_price} рублей</h2>
                  ) : null}
                </>
              ) : (
                <h2 style={{ width: "50%", marginBottom: "59px" }}>
                  <Skeleton borderRadius={15} inline={true} />
                </h2>
              )}
            </div>
            {data ? (
              <>
                {data.sale_text ? (
                  <p className={styles.saleText}>{data.sale_text}</p>
                ) : null}
              </>
            ) : (
              <></>
            )}
            <RoundSendButton value="Заказать" />
          </div>
          <div>
            <Slider
              imgIndexes={media.carouselIds}
              filesUrl={media.filesUrl}
              width={700}
              height={715}
              preloadIndexes={media.coversIds.slice(1)}
            />
          </div>
        </div>
        <div className={styles.productDescWrapper}>
          <div className={styles.modelDesc}>
            <h2 style={{ marginBottom: "15px" }}>Описание модели</h2>
            <ul>
              {data ? (
                JSON.parse(data.model_description).map((item, index) => {
                  return <li key={index}>{item}</li>;
                })
              ) : (
                <Skeleton
                  borderRadius={15}
                  count={3}
                  width="50%"
                  style={{ marginBottom: "8px" }}
                />
              )}
            </ul>
          </div>
          <div>
            <h2 style={{ marginBottom: "15px" }}>В стоимость входит</h2>
            <ul>
              {data ? (
                JSON.parse(data.price_include).map((item, index) => {
                  return <li key={index}>{item}</li>;
                })
              ) : (
                <Skeleton
                  borderRadius={15}
                  count={3}
                  style={{ marginBottom: "8px" }}
                />
              )}
            </ul>
          </div>
        </div>
        <div className={styles.videoReviewWrapper}>
          <h2 style={{ marginBottom: "35px" }}>Видеообзор</h2>
          <VideoPlayer
            filePath={media.filesUrl ? media.filesUrl + 3 : undefined}
            fullSize={false}
          />
        </div>
        <div>
          <QuestionServices QSType="service" />
        </div>
      </FadeIn>
    </div>
  );
};

export default AlbumsCard;
