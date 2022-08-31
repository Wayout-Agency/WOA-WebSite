import styles from "../QuestionServices.module.scss";
import Image from "next/future/image";

const Title = ({ title, isActive }) => {
  return (
    <div className={styles.QStitleWrapper}>
      <h3 className={styles.title}>{title}</h3>
      <Image
        src={"/static/img/plus_text.svg"}
        width={39}
        height={39}
        className={`${isActive ? styles.activePlus : null} ${styles.plusImg}`}
      />
    </div>
  );
};

export default Title;
