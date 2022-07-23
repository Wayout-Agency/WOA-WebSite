import socialLinks from "./SocialLinks.js";
import styles from "./SocialMedias.module.scss";
import footerStyles from "../Footer.module.scss";
import Link from "next/link";

const SocialMedias = () => {
  return (
    <div className={styles.socialWrapper}>
      <h2 className={footerStyles.footerTitle}>Соц. сети</h2>
      <div className={styles.socialLinks}>
        {socialLinks.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            <a className={footerStyles.footerText}>{title}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialMedias;
