import Image from "next/image";
import ExpImage from "next/future/image";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.scss";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";

import "swiper/css";

const Slider = ({
  imgIndexes,
  filesUrl,
  width = "100%",
  height = "100%",
  preloadIndexes,
  swiperClassname,
}) => {
  const swiperRef = useRef(null);
  return (
    <>
      {imgIndexes && filesUrl ? (
        <Swiper
          ref={swiperRef}
          className={`${styles.slider} ${swiperClassname}`}
          style={{ width: width, height: height }}
          grabCursor={true}
          resistanceRatio={0}
          onUpdate={() => {
            swiperRef.current.swiper.slideTo(0);
          }}
        >
          {imgIndexes.map((id) => {
            return (
              <SwiperSlide key={id}>
                <Image
                  src={`${filesUrl}${id}`}
                  className={styles.slide}
                  layout="fill"
                  alt={`slider-img-${id}`}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Skeleton width={width} height={height} borderRadius={25} />
      )}
      <div className={styles.arrowsWrapper}>
        <ExpImage
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => swiperRef.current.swiper.slidePrev()}
          width={66}
          height={28}
          src={"/static/img/arrow.svg"}
          layout="raw"
          alt="left-arrow"
        />
        <ExpImage
          className={styles.arrow}
          onClick={() => swiperRef.current.swiper.slideNext()}
          width={66}
          height={28}
          src={"/static/img/arrow.svg"}
          layout="raw"
          alt="right-arrow"
        />
      </div>
      {/* Crap solution for preloading unselected slides. Couldn't find anything that works for Next.JS */}
      {preloadIndexes ? (
        preloadIndexes.map((id) => {
          return (
            <ExpImage
              src={`${filesUrl}${id}`}
              className={styles.preloadedImages}
              width={width}
              height={height}
              layout="raw"
              key={id}
              alt={`preload-img-${id}`}
            />
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default Slider;
