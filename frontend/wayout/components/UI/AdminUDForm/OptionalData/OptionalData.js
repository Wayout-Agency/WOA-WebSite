import styles from "./OptionalData.module.scss";
import Input from "../../Input";
import Image from "next/image";
import { rootWayoutAPI } from "services/wayoutApi";
const OptionalData = ({
  optionalInputs,
  setOptionalInputs,
  separation,
  setSeparation,
  blockSample,
  handleSend,
  deleteFileAPIUrl,
}) => {
  const removeBlock = async (e, index, title) => {
    e.preventDefault();

    let currentData = [...optionalInputs];
    if (title === "Обложки" && separation) {
      setSeparation(separation - 1);
    }

    const client = await rootWayoutAPI();
    let formElementsArray = [...document.forms[1].elements];
    let lastElement = currentData[index].inputs.at(-1);

    lastElement.map(({ type, placeholder }) => {
      if (type === "file") {
        [...formElementsArray.filter((input) => input.type === "file")].map(
          async (el, index) => {
            if (el.placeholder === placeholder) {
              if (title === "Обложки" && separation) {
                handleSend(e, separation - 1);
              }
              let indexes = `${index}`;
              await client
                .delete(deleteFileAPIUrl, { params: { indexes } })
                .catch((_) => alert("Хз почему но файлик не удалился"));
            }
          }
        );
      }
    });

    currentData[index].inputs.pop();
    setOptionalInputs(currentData);
  };

  const addBlock = (e, index, sampleIndex, title) => {
    e.preventDefault();
    let currentData = [...optionalInputs];
    currentData[index].inputs.push(
      blockSample(currentData[index].inputs.length, sampleIndex)
    );
    setOptionalInputs(currentData);

    if (title === "Обложки" && separation) {
      setSeparation(separation + 1);
    }
  };

  return (
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
                    addBlock(e, index, sampleIndex, title);
                  }}
                  className={styles.optionalBtn}
                >
                  <Image
                    src={"/static/img/plus.svg"}
                    height={55}
                    width={55}
                    alt="plus"
                  />
                </button>
                <button
                  onClick={(e) => removeBlock(e, index, title)}
                  className={styles.optionalBtn}
                >
                  <Image
                    src={"/static/img/minus.svg"}
                    height={50}
                    width={50}
                    alt="minus"
                  />
                </button>
              </div>
            </div>
            {inputs.map((block, blockIndex) => {
              return block.map(
                ({ type, placeholder, value, name }, blockInputIndex) => {
                  return (
                    <Input
                      key={name + blockIndex}
                      type={type}
                      placeholder={placeholder}
                      value={value}
                      className={styles.addInput}
                      onChange={(e) => {
                        let obj = [...optionalInputs];
                        obj[index].inputs[blockIndex][blockInputIndex].value =
                          e.target.value;
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
  );
};

export default OptionalData;
