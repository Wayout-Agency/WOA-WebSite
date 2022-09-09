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
import { useAppContext } from "../AppWrapper";
import { disablePageScroll } from 'scroll-lock';
import Head from "next/head";
const range = (start, end) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
};

const AlbumsCard = ({ type }) => {
  const albumUrl = type ? `albums/${type}/` : null;
  const { setShow, setOrder } = useAppContext();
  setOrder(false);
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
  const { data } = useSWR(albumUrl, fetchAlbum);

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
    <>
      <Head>
        <title>{data ? data.title : "Загрузка..."}</title>
        <meta
          name="description"
          content={data ? data.description : "Загрузка..."}
        />
      </Head>
      <div className={styles.mainWrapper}>
        <FadeIn>
          <div className={styles.mobileTitle}>
            {data ? (
              <>
                <h2 style={{ marginBottom: "7px" }}>{data.title}</h2>
                <h3 className={styles.descMobile}>{data.description}</h3>
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
          </div>
          <div className={styles.preview}>
            <div className={styles.previewLeft}>
              {data ? (
                <>
                  <h2
                    style={{ marginBottom: "7px" }}
                    className={styles.previewTitle}
                  >
                    {data.title}
                  </h2>
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
              <h3 className={styles.coverTitle}>Обложка</h3>
              <div className={styles.coversWrapper}>
                {data ? (
                  media.coversIds.map((id, index) => {
                    return (
                      <div className={`${styles.coverWrapper} ${id === media.carouselIds[0] ? styles.activeCover : null}`} key={id}>
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
                          alt={`cover-${index + 1}`}
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
                      <h2 className={styles.oldPrice}>
                        {data.old_price} рублей
                      </h2>
                    ) : (
                      <></>
                    )}
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
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              <RoundSendButton
                value="Заказать"
                onClick={() => {
                  setShow(true);
                  disablePageScroll();
                }}
              />
            </div>
            <div>
              <Slider
                imgIndexes={media.carouselIds}
                filesUrl={media.filesUrl}
                width={700}
                height={715}
                preloadIndexes={media.coversIds.slice(1)}
                swiperClassname={styles.swiperClass}
              />
            </div>
          </div>
          <div className={styles.productDescWrapper}>
            <div className={styles.modelDesc}>
              <h2 className={styles.descModelTitle}>Описание модели</h2>
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
            <div className={styles.modelAdditionally}>
              <h2 className={styles.descModelTitle}>В стоимость входит</h2>
              <ul className={styles.additionally}>
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
            <h2 className={styles.videoTitle}>Видеообзор</h2>
            <VideoPlayer
              filePath={media.filesUrl ? media.filesUrl + 3 : undefined}
              fullSize={false}
            />
          </div>
          <div className={styles.qsWrapper}>
            <QuestionServices QSType="service" />
          </div>
        </FadeIn>
      </div>
    </>
  );
};

export default AlbumsCard;
