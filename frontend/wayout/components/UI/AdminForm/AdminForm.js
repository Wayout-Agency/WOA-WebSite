import styles from "./AdminForm.module.scss";
import Input from "../Input";
import SendButton from "../SendButton";
import DeleteButton from "../DeleteButton";

import { useState } from "react";

const AdminForm = ({
  required_data,
  optional_data,
  blockSample,
  handleSend,
  handleDelete,
}) => {
  const [inputs, setInputs] = useState(optional_data);

  const addButton = (e, index) => {
    e.preventDefault();
    let current_data = [...inputs];
    current_data[index].inputs.push(
      blockSample(current_data[index].inputs.length)
    );
    setInputs(current_data);
  };

  return (
    <div className={styles.formWrapper}>
      <form name="my">
        <div className={styles.requiredWrapper}>
          <h3 className={styles.subTitle}>Обязательные данные</h3>
          {required_data.map(
            (
              { type, placeholder, value, className, onChange, name },
              index
            ) => {
              return (
                <Input
                  key={index}
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  className={className}
                  onChange={onChange}
                  name={name}
                />
              );
            }
          )}
        </div>
        <div className={styles.optionalWrapper}>
          <h3 className={styles.subTitle}>Дополнительные данные</h3>
          {inputs.map(({ inputs, title }, index) => {
            return (
              <div className={styles.optionalComponenet} key={index}>
                <div className={styles.optionalTitleWrapper}>
                  <h4 className={styles.optionalTitle}>{title}</h4>
                  <button
                    onClick={(e) => {
                      addButton(e, index);
                    }}
                    className={styles.optionalBtn}
                  >
                    +
                  </button>
                </div>
                {inputs.map((block, index) => {
                  return block.map(
                    ({
                      type,
                      placeholder,
                      value,
                      className,
                      onChange,
                      name,
                    }) => {
                      return (
                        <Input
                          key={index}
                          type={type}
                          placeholder={placeholder}
                          value={value}
                          className={styles.addInput}
                          onChange={onChange}
                          name={name}
                        />
                      );
                    }
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className={styles.buttonsWrapper}>
          <DeleteButton />
          <SendButton value="Отправить" />
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
