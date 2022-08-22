import styles from "./Process.module.scss";
import processData from "./processData";

const Process = () => {
  return (
    <div className={styles.processWrapper}>
      <h2 className={styles.title}>Этапность</h2>
      <div className={styles.processContentWrapper}>
        {processData.map(({ title, description }, index) => {
          return (
            <div className={styles.processItem} key={index}>
              <h2 className={styles.processTitle}>{title}</h2>
              <p className={styles.processText}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Process;
