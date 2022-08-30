import styles from "./Graduations.module.scss";
import FadeIn from "../UI/Animations/";
import MainTitle from "../UI/MainTitle";
import Circle from "./Circle";
import circlesData from "./Circle/circlesData";
import Form from "./Form";

const Graduations = () => {
  return (
    <FadeIn>
      <MainTitle text="Мы можем организовать ваш выпускной за 3 дня." />
      <div className={styles.descWrapper} style={{ marginTop: "50px" }}>
        <h2>Подход</h2>
        <p className={styles.desc}>
          Мы уникальная команда исследователей и стратегов, работающая в
          парадигме совмещения академических практик и маркетинга. Мы называем
          такой подход DIVE DEEP. В команде есть бренд-стратеги и эксперты по
          маркетинговым коммуникациям.
        </p>
      </div>
      <div className={styles.circlesWrapper}>
        <div className={styles.circlesGroup}>
          {circlesData.map(({ text, size, top, left }, index) => (
            <Circle
              id={index}
              text={text}
              size={size}
              top={top}
              left={left}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className={styles.descWrapper} style={{ marginTop: "100px" }}>
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
