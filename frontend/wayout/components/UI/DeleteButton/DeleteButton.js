import styles from "./DeleteButton.module.scss";

const DeleteButton = ({ value, onClick }) => {
  return (
    <input
      type="submit"
      className={styles.button}
      value={value ? value : "Удалить"}
      onClick={onClick}
    />
  );
};

export default DeleteButton;
