import styles from "./About.module.scss";

import MainTitle from "../UI/MainTitle";
import RoundSendButton from "../UI/RoundSendButton";
import VideoPlayer from "../UI/VideoPlayer";
import { numbers, team } from "./aboutData";
import AboutCard from "./AboutCard";
import FadeIn from "../UI/Animations/";
import ExpImage from "next/future/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";

const About = () => {
  const swiperRef = useRef(null);
  return (
    <>
      <MainTitle text={"Об агенстве"} />
      <FadeIn>
        <>
          <div className={styles.videoWrapper}>
            <VideoPlayer filePath={"/static/video/main.mp4"} autoPlay={false} />
          </div>
          <div className={styles.numbersWrapper}>
            <h2>Цифры</h2>
            <div className={styles.numbersContent}>
              {numbers.map((value, index) => {
                return (
                  <p className={styles.number} key={index}>
                    — {value}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.teamWrapper}>
            <div className={styles.controls}>
              <h2>Команда</h2>
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
            </div>
            <Swiper
              className={styles.swiper}
              ref={swiperRef}
              slidesPerView={"auto"}
              spaceBetween={33}
              breakpoints={{
                800: {
                  spaceBetween: 33,
                },
                320: {
                  spaceBetween: 15,
                },
              }}
            >
              {team.map(({ name, role, isSuper }, index) => {
                return (
                  <SwiperSlide key={index} className={styles.slide}>
                    <AboutCard
                      name={name}
                      role={role}
                      isSuper={isSuper}
                      index={index}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div className={styles.infoTeamWrapper}>
            <div className={styles.infoTeamTextWrapper}>
              <div className={styles.infoTeam}>
                <h2>Услуги</h2>
                <p className={styles.infoTeamText}>
                  Мы занимаемся организацией выпускных и созданием альбомов по
                  всей России. Даже в ее самых далеких уголках. Нам удалось
                  достичь такого результата путем внедрения современных
                  технологий и автоматизации типичных задач.
                </p>
              </div>
              <div className={styles.infoTeamRight}>
                <h2>Цель</h2>
                <p className={styles.infoTeamText}>
                  Сделать качественные альбомы и выпускные доступными для детей
                  на территории всей нашей великой и необъятной.
                </p>
              </div>
            </div>
            <div className={styles.infoTeamBtnWrapper}>
              <div className={styles.infoTeam} style={{ marginBottom: 0 }}>
                <h2>Сотрудничество</h2>
                <p className={styles.infoTeamText}>
                  Мы всегда рады новым знакомствам и интересным предложениям!
                </p>
              </div>
              <div className={styles.infoTeamBtn}>
                <RoundSendButton value={"Написать"} />
              </div>
            </div>
          </div>
        </>
      </FadeIn>
    </>
  );
};

export default About;
