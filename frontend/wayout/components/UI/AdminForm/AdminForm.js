import styles from "./AdminForm.module.scss";
import Input from "../Input";
import SendButton from "../SendButton";
import DeleteButton from "../DeleteButton";
import Image from "next/image";
import { useState } from "react";

const AdminForm = ({
  required_data,
  optional_data,
  blockSample,
  handleSend,
  handleDelete,
  globalOnChange,
  customRemoveBlock,
}) => {
  const [inputs, setInputs] = useState(optional_data);

  const defaultRemoveBlock = (e, index) => {
    e.preventDefault();
    let current_data = [...inputs];
    current_data[index].inputs.pop();
    setInputs(current_data);
  };

  const addBlock = (e, index, sampleIndex) => {
    e.preventDefault();
    let current_data = [...inputs];
    current_data[index].inputs.push(
      blockSample(current_data[index].inputs.length, sampleIndex)
    );
    setInputs(current_data);
  };

  return (
    <div className={styles.formWrapper}>
      <form name="my">
        <div className={styles.requiredWrapper}>
          <h3 className={styles.subTitle}>Обязательные данные</h3>
          {required_data.map(({ type, placeholder, value, name }, index) => {
            return (
              <Input
                key={index}
                type={type}
                placeholder={placeholder}
                value={value}
                className={styles.addInput}
                onChange={globalOnChange}
                name={name}
              />
            );
          })}
        </div>
        <div className={styles.optionalWrapper}>
          <h3 className={styles.subTitle}>Дополнительные данные</h3>
          {inputs.map(({ inputs, title, sampleIndex }, index) => {
            return (
              <div className={styles.optionalComponenet} key={index}>
                <div className={styles.optionalTitleWrapper}>
                  <h4 className={styles.optionalTitle}>{title}</h4>
                  <div className={styles.optionalTitleWrapper}>
                    <button
                      onClick={(e) => {
                        addBlock(e, index, sampleIndex);
                      }}
                      className={styles.optionalBtn}
                    >
                      <Image
                        src={"/static/img/plus.svg"}
                        height={55}
                        width={55}
                      />
                    </button>
                    <button
                      onClick={
                        customRemoveBlock
                          ? (e) => {
                              customRemoveBlock(e, index);
                            }
                          : (e) => {
                              defaultRemoveBlock(e, index);
                            }
                      }
                      className={styles.optionalBtn}
                    >
                      <Image
                        src={"/static/img/minus.svg"}
                        height={50}
                        width={50}
                      />
                    </button>
                  </div>
                </div>
                {inputs.map((block, index) => {
                  return block.map(({ type, placeholder, value, name }) => {
                    return (
                      <Input
                        key={index}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        className={styles.addInput}
                        onChange={globalOnChange}
                        name={name}
                      />
                    );
                  });
                })}
              </div>
            );
          })}
        </div>
        <div className={styles.buttonsWrapper}>
          <DeleteButton onClick={handleDelete} />
          <SendButton
            value="Отправить"
            onClick={(e) => {
              let inputsLen = [];
              inputs.map(({ inputs }) => {
                inputsLen.push([...Array(inputs.length).keys()]);
              });
              handleSend(e, inputsLen);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
