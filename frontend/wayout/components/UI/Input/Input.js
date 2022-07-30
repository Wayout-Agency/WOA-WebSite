import styles from "./Input.module.scss";

const Input = ({
  type = "text",
  placeholder,
  value,
  className = " ",
  name,
  onChange,
}) => (
  <input
    value={value}
    type={type}
    placeholder={placeholder}
    className={`${styles.input} ${className}`}
    onChange={onChange}
    name={name}
  />
);

export default Input;
