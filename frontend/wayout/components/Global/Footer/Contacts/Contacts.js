import styles from "./Contacts.module.scss";
import footerStyles from "../Footer.module.scss";
const Contacts = () => {
  return (
    <div className={styles.contactsWrapper}>
      <h2 className={footerStyles.footerTitle}>Контакты</h2>
      <div className={styles.contactsData}>
        <div className={styles.contactsPhoneWrapper}>
          <a
            className={`${footerStyles.footerText} ${styles.contactsPhone}`}
            href="tel:79858604455"
          >
            +7 985 860 44 55
          </a>
          <p className={styles.contactsPhoneTime}>10:00-18:00</p>
        </div>
        <a
          className={footerStyles.footerText}
          style={{ position: "relative", top: 5 }}
          href="mailto:hello@wayout.agency"
        >
          hello@wayout.agency
        </a>
      </div>
    </div>
  );
};

export default Contacts;
