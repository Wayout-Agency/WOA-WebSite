import styles from "./About.module.scss";

import MainTitle from "../UI/MainTitle";
import RoundSendButton from "../UI/RoundSendButton";
import VideoPlayer from "../UI/VideoPlayer";
import { numbers, team } from "./aboutData";
import AboutCard from "./AboutCard";
import FadeIn from "../UI/Animations/";
const About = () => {
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
            <h2>Команда</h2>
            <div className={styles.cardsWrapper}>
              {team.map(({ name, role, isSuper }, index) => {
                return (
                  <AboutCard
                    key={index}
                    name={name}
                    role={role}
                    isSuper={isSuper}
                    index={index}
                  />
                );
              })}
            </div>
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
