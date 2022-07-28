import styles from "./Input.module.scss";

const Input = ({
  type = "text",
  placeholder,
  value,
  className = " ",
  onChange,
}) => (
  <input
    value={value}
    type={type}
    placeholder={placeholder}
    className={`${styles.input} ${className}`}
    onChange={onChange}
  />
);

export default Input;
