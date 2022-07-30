import styles from "./SendButton.module.scss";

const SendButton = ({ value, onClick }) => {
  return (
    <input
      type="submit"
      className={styles.button}
      value={value ? value : "Обновить"}
      onClick={onClick}
    />
  );
};

export default SendButton;
