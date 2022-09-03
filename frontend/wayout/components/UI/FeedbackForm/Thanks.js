import styles from "./FeedbackForm.module.scss";

export const Thanks = ({ submited }) => {
  return (
    <div
      className={`${styles.thanksWrapper} ${
        submited ? styles.showThanks : null
      }`}
    >
      <div className={`${styles.header}`}>Спасибо!</div>
      <p className={styles.callback}>Мы свяжемся с вами в течение 3-х минут.</p>
    </div>
  );
};
