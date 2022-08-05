import styles from "./OnSubmit.module.scss";
import SendButton from "../../SendButton";
import DeleteButton from "../../DeleteButton";
const OnSubmit = ({ handleSend, handleDelete, separation }) => {
  return (
    <div className={styles.buttonsWrapper}>
      <DeleteButton onClick={handleDelete} />
      <SendButton
        value="Отправить"
        onClick={(e) => {
          separation ? handleSend(e, separation) : handleSend(e);
        }}
      />
    </div>
  );
};

export default OnSubmit;
