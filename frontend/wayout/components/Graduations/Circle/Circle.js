import styles from "./Circle.module.scss";

const Circle = ({ id, text, size, top = 0, left = 0 }) => {
  return (
    <div
      id={`circle${id}`}
      className={styles.circle}
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
      }}
    >
      {text}
    </div>
  );
};

export default Circle;
