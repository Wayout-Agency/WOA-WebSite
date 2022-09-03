import styles from "./Menu.module.scss";
import footerStyles from "../Footer.module.scss";
import navigation from "@/components/UI/Navbar/navigation";
import Link from "next/link";
import Underline from "@/components/UI/Animations/Underline";
const Menu = () => {
  return (
    <div className={styles.menuWrapper}>
      <h2 className={footerStyles.footerTitle}>Меню</h2>
      <div className={styles.menuLinks}>
        {navigation.map(({ id, title, path }) => (
          <Underline key={id} className={footerStyles.margin}>
            <Link href={path}>
              <a className={footerStyles.footerText}>{title}</a>
            </Link>
          </Underline>
        ))}
      </div>
    </div>
  );
};
export default Menu;
