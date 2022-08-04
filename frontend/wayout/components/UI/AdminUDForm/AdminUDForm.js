import styles from "./AdminUDForm.module.scss";
import Input from "../Input";
import SendButton from "../SendButton";
import DeleteButton from "../DeleteButton";
import Image from "next/image";
import { useState } from "react";

// Нужно добавить old_separation / new_separation
// Нужно добавить url для удаления (Функицю обработки минуса)
// Разобраться с функцией on change
// Добваить индексы файлов
// Возможно стоит разбить required data и optioanal data на отдельные компоненты

const AdminUDForm = ({
  required_data,
  optional_data,
  blockSample,
  handleSend,
  handleDelete,
  indexes,
  setIndexes,
}) => {
  const [optionalInputs, setOptionalInputs] = useState(optional_data);
  const [requiredInputs, setRequiredInputs] = useState(required_data);
  const [files, setFile] = useState([]);

  const removeBlock = (e, index) => {
    e.preventDefault();
    let current_data = [...optionalInputs];
    current_data[index].inputs.pop();
    setOptionalInputs(current_data);
  };

  const addBlock = (e, index, sampleIndex) => {
    e.preventDefault();
    let current_data = [...optionalInputs];
    let slice = current_data.slice(index + 1, current_data.length);
    console.log(slice);

    console.log(current_data);
    console.log();
    current_data[index].inputs.push(
      blockSample(current_data[index].inputs.length, sampleIndex)
    );
    setOptionalInputs(current_data);
  };

  return (
    <div className={styles.formWrapper}>
      <form name="my">
        <div className={styles.requiredWrapper}>
          <h3 className={styles.subTitle}>Обязательные данные</h3>
          {requiredInputs.map(
            ({ type, placeholder, onChange, value, name }, index) => {
              return (
                <Input
                  key={index}
                  type={type}
                  placeholder={placeholder}
                  value={value}
                  className={styles.addInput}
                  onChange={(e) => {
                    if (e.target.type === "file") {
                      setFile([...files, e.target.files[0]]);
                      if (isNaN(e.target.name.at(-1))) {
                        setIndexes(indexes + e.target.name[0]);
                        return;
                      }
                    }
                    let currentInputs = [...requiredInputs];
                    let currentInput = currentInputs[index];
                    currentInput.value = e.target.value;
                    setRequiredInputs(currentInputs);
                  }}
                  name={name}
                />
              );
            }
          )}
        </div>
        <div className={styles.optionalWrapper}>
          <h3 className={styles.subTitle}>Дополнительные данные</h3>
          {optionalInputs.map(({ inputs, title, sampleIndex }, index) => {
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
                      onClick={(e) => removeBlock(e, index)}
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
                {inputs.map((block, blockIndex) => {
                  return block.map(
                    (
                      { type, placeholder, onChnage, value, name },
                      blockInputIndex
                    ) => {
                      return (
                        <Input
                          key={blockIndex}
                          type={type}
                          placeholder={placeholder}
                          value={value}
                          className={styles.addInput}
                          onChange={(e) => {
                            if (e.target.type === "file") {
                              setFile([...files, e.target.files[0]]);
                              console.log(e.target.name);
                              if (isNaN(e.target.name.at(-1))) {
                                setIndexes(indexes + e.target.name[0]);
                                return;
                              }
                            }
                            let obj = [...optionalInputs];
                            obj[index].inputs[blockIndex][
                              blockInputIndex
                            ].value = e.target.value;
                            // console.log(obj);
                            // console.log(currentInputs);
                            // let currentBlock = obj;
                            // let currentInput = currentBlock;
                            // currentInput.value
                            // console.log(currentInput);

                            // // console.log(currentBlock);
                            // // currentInput.value = e.target.value;
                            setOptionalInputs([...obj]);
                          }}
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
          <DeleteButton onClick={handleDelete} />
          <SendButton
            value="Отправить"
            onClick={(e) => {
              e.preventDefault();
              console.log(requiredInputs);
              console.log(optionalInputs);
              let data = [requiredInputs] + [optionalInputs];
              handleSend(e, data, indexes, files);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default AdminUDForm;
