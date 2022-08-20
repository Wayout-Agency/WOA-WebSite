import styles from "../Navbar.module.scss";
import { default as ExpImage } from "next/future/image";
import { useState } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
const Burger = ({ click, setClick }) => {
  return (
    <>
      <div
        className={styles.burgerWrapper}
        onClick={() => {
          const element = document.querySelector("#__next");
          if (!click) {
            disableBodyScroll(element);
          } else {
            enableBodyScroll(element);
          }
          setClick(!click);
        }}
      >
        <ExpImage
          src={"/static/img/line.svg"}
          width={50}
          height={3}
          className={`${styles.line1} ${click ? styles.clicked1 : null}`}
        />
        <ExpImage
          src={"/static/img/line.svg"}
          width={50}
          height={3}
          className={`${styles.line2} ${click ? styles.clicked2 : null}`}
        />
      </div>
    </>
  );
};
export default Burger;
