import styles from "./OptionalData.module.scss";
import Input from "../../Input";
import Image from "next/image";

const OptionalData = ({
  inputs,
  setInputs,
  separation,
  setSeparation,
  blockSample,
}) => {
  const removeBlock = (e, index, title) => {
    e.preventDefault();
    let current_data = [...inputs];
    current_data[index].inputs.pop();
    setInputs(current_data);
    if (title === "Обложки" && separation) {
      setSeparation(separation - 1);
    }
  };

  const addBlock = (e, index, sampleIndex, title) => {
    e.preventDefault();
    let current_data = [...inputs];
    current_data[index].inputs.push(
      blockSample(current_data[index].inputs.length, sampleIndex)
    );
    setInputs(current_data);
    if (title === "Обложки" && separation) {
      setSeparation(separation + 1);
    }
  };
  return (
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
                    addBlock(e, index, sampleIndex, title);
                  }}
                  className={styles.optionalBtn}
                >
                  <Image src={"/static/img/plus.svg"} height={55} width={55} />
                </button>
                <button
                  onClick={(e) => removeBlock(e, index, title)}
                  className={styles.optionalBtn}
                >
                  <Image src={"/static/img/minus.svg"} height={50} width={50} />
                </button>
              </div>
            </div>
            {inputs.map((block, index) => {
              return block.map(({ type, placeholder, name }) => {
                return (
                  <Input
                    key={name + index}
                    type={type}
                    placeholder={placeholder}
                    className={styles.addInput}
                    name={name}
                  />
                );
              });
            })}
          </div>
        );
      })}
    </div>
  );
};

export default OptionalData;
