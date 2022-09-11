import styles from "./BurgerMenu.module.scss";
import navigation from "../Navbar/navigation";
import socialLinks from "../../Global/Footer/SocialMedias/SocialLinks";
import Link from "next/link";
import { enablePageScroll } from "scroll-lock";
import { default as ExpImage } from "next/future/image";

const BurgerMenu = ({ click, setClick }) => {
  return (
    <div className={`${styles.menu} ${click ? styles.show : null}`}>
      <div className={styles.navigationWrapper}>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            <div
              className={styles.linkWrapper}
              onClick={() => {
                enablePageScroll();
                setClick(!click);
              }}
            >
              <a className={styles.link}>{title}</a>
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
              enablePageScroll();
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
