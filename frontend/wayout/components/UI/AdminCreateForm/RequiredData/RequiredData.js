import styles from "./RequiredData.module.scss";
import Input from "../../Input";

const RequiredData = ({ requiredData }) => {
  return (
    <div className={styles.requiredWrapper}>
      <h3 className={styles.subTitle}>Обязательные данные</h3>
      {requiredData.map(({ type, placeholder, name }, index) => {
        return (
          <Input
            key={index}
            type={type}
            placeholder={placeholder}
            className={styles.addInput}
            name={name}
          />
        );
      })}
    </div>
  );
};

export default RequiredData;
