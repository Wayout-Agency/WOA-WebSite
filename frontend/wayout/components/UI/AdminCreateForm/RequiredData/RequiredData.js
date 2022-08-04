import styles from "./RequiredData.module.scss";
import Input from "../../Input";

const RequiredData = ({ required_data }) => {
  return (
    <div className={styles.requiredWrapper}>
      <h3 className={styles.subTitle}>Обязательные данные</h3>
      {required_data.map(({ type, placeholder, name }, index) => {
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
