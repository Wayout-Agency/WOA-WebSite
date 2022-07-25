import styles from "./SendButton.module.scss";

const SendButton = () => {
  return <input type="submit" className={styles.button} value="Обновить" />;
};

export default SendButton;
