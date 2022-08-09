import styles from "./MainTitle.module.scss";

const MainTitle = ({ text, description, color = true }) => (
  <h1 className={color ? styles.title : styles.white}>
    {text}{" "}
    {description ? (
      <span className={styles.grayTitle}>{description}</span>
    ) : (
      <></>
    )}
  </h1>
);

export default MainTitle;
