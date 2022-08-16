import styles from "./MainTitle.module.scss";

const MainTitle = ({ text, description, className }) => (
  <h1 className={`${className} ${styles.title}`}>
    {text}{" "}
    {description ? (
      <span className={styles.grayTitle}>{description}</span>
    ) : (
      <></>
    )}
  </h1>
);

export default MainTitle;
