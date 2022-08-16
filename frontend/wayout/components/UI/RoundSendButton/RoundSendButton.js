import styles from "../SendButton/SendButton.module.scss";
import roundStyles from "./RoundSendButton.module.scss";
const RoundSendButton = ({ value, onClick, className }) => {
  return (
    <input
      type="submit"
      className={`${styles.button} ${roundStyles.roundButton} ${className}`}
      value={value ? value : "Обновить"}
      onClick={onClick}
    />
  );
};

export default RoundSendButton;
