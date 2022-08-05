import styles from "./RequiredData.module.scss";
import Input from "../../Input";

const RequiredData = ({ requiredInputs, setRequiredInputs }) => {
  return (
    <div className={styles.requiredWrapper}>
      <h3 className={styles.subTitle}>Обязательные данные</h3>
      {requiredInputs.map(({ type, placeholder, value, name }, index) => {
        return (
          <Input
            key={index}
            type={type}
            placeholder={placeholder}
            value={value}
            className={styles.addInput}
            onChange={(e) => {
              let currentInputs = [...requiredInputs];
              let currentInput = currentInputs[index];
              currentInput.value = e.target.value;
              setRequiredInputs(currentInputs);
            }}
            name={name}
          />
        );
      })}
    </div>
  );
};

export default RequiredData;
