import styles from "./AdminPanel.module.scss";
import adminLinks from "./adminLinks";
import Link from "next/link";
const AdminPanel = () => {
  return (
    <div className={styles.adminLinks}>
      {adminLinks.map(({ id, title, path }) => (
        <Link key={id} href={path}>
          <a className={styles.link}>{title}</a>
        </Link>
      ))}
    </div>
  );
};

export default AdminPanel;
