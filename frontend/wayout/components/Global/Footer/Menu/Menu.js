import styles from "./Menu.module.scss";
import footerStyles from "../Footer.module.scss";
import navigation from "@/components/UI/Navbar/navigation";
import Link from "next/link";

const Menu = () => {
  return (
    <div className={styles.menuWrapper}>
      <h2 className={footerStyles.footerTitle}>Меню</h2>
      <div className={styles.menuLinks}>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            <a className={footerStyles.footerText}>{title}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Menu;
