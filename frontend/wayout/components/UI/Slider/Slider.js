import ExpImage from "next/future/image";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.scss";
import { useRef } from "react";
import Skeleton from "react-loading-skeleton";

import "swiper/css";

const Slider = ({ imgIndexes, filesUrl, width, height, preloadIndexes }) => {
  const swiperRef = useRef(null);
  return (
    <>
      {imgIndexes && filesUrl ? (
        <Swiper
          ref={swiperRef}
          className={styles.slider}
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
                <ExpImage
                  src={`${filesUrl}${id}`}
                  className={styles.slide}
                  width={width}
                  height={height}
                  layout="raw"
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
          className={styles.arrow}
          onClick={() => swiperRef.current.swiper.slidePrev()}
          width={66}
          height={28}
          style={{ transform: "scale(-1)", marginRight: "30px" }}
          src={"/static/img/arrow.svg"}
          layout="raw"
        />
        <ExpImage
          className={styles.arrow}
          onClick={() => swiperRef.current.swiper.slideNext()}
          width={66}
          height={28}
          src={"/static/img/arrow.svg"}
          layout="raw"
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
