import Contacts from "./Contacts";
import Menu from "./Menu";
import SocialMedias from "./SocialMedias";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerWrapper}>
        <div className={styles.footerInfo}>
          <Contacts />
          <div className={styles.socialWrapper}>
            <SocialMedias />
            <Menu />
          </div>
        </div>
        <div className={styles.footerData}>
          <div>
            <p className={styles.privacyPolicy}>
              Информация и{" "}
              <Link href="/policy">
                <a className={styles.privacyPolicyLink}>
                  политика конфиденциальности.
                </a>
              </Link>{" "}
            </p>
            <p className={styles.privacyPolicy} style={{ marginTop: 4 }}>
              <Link href="/offer">
                <a className={styles.privacyPolicyLink}>Условия оферты.</a>
              </Link>
            </p>
          </div>
          <p className={styles.copyright}>© ИП Бабаян Денис Маркович, {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
