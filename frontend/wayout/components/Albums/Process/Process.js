import styles from "./Process.module.scss";
import processData from "./processData";

const Process = () => {
  return (
    <div className={styles.processWrapper}>
      <h2 className={styles.title}>Процесс от А до Я</h2>
      <div className={styles.processContentWrapper}>
        {processData.map(({ title, description }, index) => {
          return (
            <div className={styles.processItem} key={index}>
              <h2>{title}</h2>
              <p className={styles.processText}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Process;
