import styles from "./Underline.module.scss";
import { useState } from "react";
const Underline = ({ children, className }) => {
  return (
    <span className={`${styles.underline} ${className}`}>
      <span className={styles.text}>{children}</span>
      <span className={styles.hiddenUnderline}>{children}</span>
    </span>
  );
};
export default Underline;
