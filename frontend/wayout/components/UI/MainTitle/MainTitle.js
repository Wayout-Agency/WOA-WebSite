import styles from "./MainTitle.module.scss";
import { motion } from "framer-motion";

const MainTitle = ({ text, className, description }) => {
  return (
    <motion.h1
      className={`${className} ${styles.title} ${styles.rowLetter}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      {text}{" "}
      {description ? (
        <span className={styles.grayTitle}>{description}</span>
      ) : (
        <></>
      )}
    </motion.h1>
  );
};

export default MainTitle;
