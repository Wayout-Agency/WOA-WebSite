import Link from "next/link";
import styles from "./Header.module.scss";


const Header = () => {
  return (
    <div className={styles.adminHeader}>
      <Link href={"/admin"}>
        <a>
          <h2 className={styles.title}>Админ панель:</h2>
        </a>
      </Link>
    </div>
  );
};

export default Header;
