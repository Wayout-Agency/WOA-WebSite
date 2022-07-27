import Link from "next/link";
import styles from "./AdminHeader.module.scss";
import panelStyles from "../AdminPanel.module.scss";


const AdminHeader = () => {
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

export default AdminHeader;
