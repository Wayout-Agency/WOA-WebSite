import styles from "./Error.module.scss";
import Link from "next/link";

const Error = ({ code, description }) => {
  return (
    <div className={styles.errorWraper}>
      <h1 className={styles.errorTitle}>Ошибка {code}</h1>
      <p className={styles.errorDescription}>
        {description}{" "}
        <Link href={"/"}>
          <a className={styles.backLink}>Главную</a>
        </Link>
      </p>
    </div>
  );
};

export default Error;
