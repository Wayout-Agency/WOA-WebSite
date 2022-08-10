import styles from "../SendButton/SendButton.module.scss";
import roundStyles from "./RoundSendButton.module.scss";
const RoundSendButton = ({ value, onClick }) => {
  return (
    <input
      type="submit"
      className={`${styles.button} ${roundStyles.roundButton}`}
      value={value ? value : "Обновить"}
      onClick={onClick}
    />
  );
};

export default RoundSendButton;
