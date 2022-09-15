import styles from "../Navbar.module.scss";
import { default as ExpImage } from "next/future/image";
import { enablePageScroll, disablePageScroll } from "scroll-lock";
const Burger = ({ click, setClick }) => {
  return (
    <>
      <div
        className={styles.burgerWrapper}
        onClick={() => {
          if (!click) {
            disablePageScroll();
          } else {
            enablePageScroll();
          }
          setClick(!click);
        }}
      >
        <ExpImage
          src={"/static/img/line.svg"}
          width={50}
          height={3}
          className={`${styles.line1} ${click ? styles.clicked1 : null}`}
          alt={'line'}
        />
        <ExpImage
          src={"/static/img/line.svg"}
          width={50}
          height={3}
          className={`${styles.line2} ${click ? styles.clicked2 : null}`}
          alt={'line'}
        />
      </div>
    </>
  );
};
export default Burger;
