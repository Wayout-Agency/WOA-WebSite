import roundStyles from "./RoundInput.module.scss";
import styles from "../Input/Input.module.scss";
const RoundInput = ({
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  onPaste,
  onKeyDown,
  className,
}) => (
  <input
    value={value}
    type={type}
    placeholder={placeholder}
    className={`${styles.input} ${roundStyles.roundInput} ${className}`}
    onChange={onChange}
    name={name}
    onPaste={onPaste}
    onKeyDown={onKeyDown}
  />
);

export default RoundInput;
