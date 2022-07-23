import cn from "classnames";
import styles from "./Input.module.scss";

const Input = ({ type = "text", placeholder, value, className }) => (
  <input
    value={value}
    type={type}
    placeholder={placeholder}
    className={cn(styles.input, className)}
  />
);

export default Input;
