import styles from "./Circle.module.scss";

const Circle = ({ id, text, size, transformWork, top, left, x, y }) => {
  return (
    <div
      id={`circle${id}`}
      className={`${styles.circle} ${
        !transformWork ? styles.disableTransform : ""
      }`}
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
        transform: `translate3d(${x}vw, ${y}vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {text}
    </div>
  );
};

export default Circle;
