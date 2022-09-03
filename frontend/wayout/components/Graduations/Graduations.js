import styles from "./Graduations.module.scss";
import FadeIn from "../UI/Animations/";
import MainTitle from "../UI/MainTitle";
import Circle from "./Circle";
import circlesData from "./Circle/circlesData";
import Form from "./Form";
import { useState } from "react";
const Graduations = () => {
  const [transformWork, setTransformWork] = useState(false);
  return (
    <FadeIn>
      <MainTitle
        text={
          <span>
            Мы можем организовать<br></br>Ваш выпускной за 3 дня.
          </span>
        }
      />
      <div className={styles.descWrapper}>
        <h2>Подход</h2>
        <p className={styles.desc}>
          Мы уникальная команда исследователей и стратегов, работающая в
          парадигме совмещения академических практик и маркетинга. Мы называем
          такой подход DIVE DEEP. В команде есть бренд-стратеги и эксперты по
          маркетинговым коммуникациям.
        </p>
      </div>
      <div
        className={styles.circlesWrapper}
        onMouseEnter={() => setTransformWork(true)}
        onMouseLeave={() => setTransformWork(false)}
      >
        <div className={styles.circlesGroup}>
          {circlesData.map(({ text, size, top, left, x, y}, index) => (
            <Circle
              id={index}
              text={text}
              size={size}
              top={top}
              left={left}
              key={index}
              transformWork={transformWork}
              x={x}
              y={y}
            />
          ))}
        </div>
      </div>
      <div className={styles.descWrapper}>
        <h2>Подход</h2>
        <p className={styles.desc}>
          Мы уникальная команда исследователей и стратегов, работающая в
          парадигме совмещения академических практик и маркетинга. Мы называем
          такой подход DIVE DEEP. В команде есть бренд-стратеги и эксперты по
          маркетинговым коммуникациям.
        </p>
      </div>
      <div className={styles.offerText}>Получите предложение</div>
      <p className={styles.desc}>
        В данный момент мы обновляем наши программы, заполните небольшую анкету,
        чтобы одними из первых получить информацию об организации Вашего
        выпускного.
      </p>
      <div className={styles.offerFeedback}>
        <Form />
      </div>
    </FadeIn>
  );
};

export default Graduations;
