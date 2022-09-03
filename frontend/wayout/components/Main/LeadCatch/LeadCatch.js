import styles from "./LeadCatch.module.scss";
import Text from "./Text";
import Form from "./Form";

const LeadCatch = () => {
  return (
    <div className={styles.leadCatchWrapper}>
      <Text />
      <Form />
    </div>
  );
};

export default LeadCatch;
