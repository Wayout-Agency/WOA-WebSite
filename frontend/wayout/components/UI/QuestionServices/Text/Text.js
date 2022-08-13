import styles from "../QuestionServices.module.scss";
import { useRef } from "react";
const Text = ({ text, isActive }) => {
  const refWrapper = useRef(null);

  const getMaxHeight = () => {
    let ref = refWrapper.current;
    if (isActive) return ref.scrollHeight + "px";
    return "0";
  };
  
  return (
    <div
      ref={refWrapper}
      className={`${styles.textWrapper}`}
      style={{ maxHeight: getMaxHeight() }}
    >
      <h3 className={`${styles.text}`}>{text}</h3>
    </div>
  );
};

export default Text;
