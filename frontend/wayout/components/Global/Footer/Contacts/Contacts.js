import styles from "./Contacts.module.scss";
import footerStyles from "../Footer.module.scss";
const Contacts = () => {
  return (
    <div className={styles.contactsWrapper}>
      <h2 className={footerStyles.footerTitle}>Контакты</h2>
      <div className={styles.contactsData}>
        <div className={styles.contactsPhoneWrapper}>
          <p className={`${footerStyles.footerText} ${styles.contactsPhone}`}>
            +7 985 860 44 55
          </p>
          <p className={styles.contactsPhoneTime}>10:00-18:00</p>
        </div>
        <p className={footerStyles.footerText}>hello@wayout.moscow</p>
      </div>
    </div>
  );
};

export default Contacts;
