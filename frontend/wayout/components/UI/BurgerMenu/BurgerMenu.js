import styles from "./BurgerMenu.module.scss";
import navigation from "../Navbar/navigation";
import socialLinks from "../../Global/Footer/SocialMedias/SocialLinks";
import Link from "next/link";
import { enableBodyScroll } from "body-scroll-lock";
import { default as ExpImage } from "next/future/image";

const BurgerMenu = ({ click, setClick }) => {
  return (
    <div className={`${styles.menu} ${click ? styles.show : null}`}>
      <div className={styles.navigationWrapper}>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            <div className={styles.linkWrapper}>
              <a
                className={styles.link}
                onClick={() => {
                  const element = document.querySelector("#__next");
                  enableBodyScroll(element);
                  setClick(!click);
                }}
              >
                {title}
              </a>
              <ExpImage
                width={46}
                height={20}
                src={"/static/img/arrow.svg"}
                className={styles.arrow}
              />
            </div>
          </Link>
        ))}
      </div>
      <h2 className={`${styles.socialTitle} ${styles.link}`}>Соц. сети</h2>
      <div className={styles.socialLinksWrapper}>
        {socialLinks.map(({ id, title, path }) => (
          <a
            key={id}
            className={styles.linkSocial}
            href={path}
            onClick={() => {
              const element = document.querySelector("#__next");
              enableBodyScroll(element);
              setClick(!click);
            }}
          >
            {title}
          </a>
        ))}
      </div>
    </div>
  );
};
export default BurgerMenu;
