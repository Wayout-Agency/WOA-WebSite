import Link from "next/link";
import styles from "./ClientCard.module.scss";
import Image from "next/future/image";
import config from "config";

const ClientCard = ({
  divId,
  postType,
  slug,
  caseId,
  title,
  description,
  width,
  height,
}) => {
  return (
    <Link href={`/journal/${postType}/${slug}`}>
      <div className={styles.cardWrapper} style={{ width: width }} id={divId}>
        <div className={styles.imgWrapper}>
          <Image
            src={`${config.apiUrl}/files/cases/${caseId}/0/`}
            height={height}
            width={width}
            className={styles.img}
            layout="raw"
          />
        </div>

        <h3 className={`${styles.hover} ${styles.title}`}>
          {title + " "}
          <span className={styles.description}>
            {description ? description : ""}
          </span>
        </h3>
      </div>
    </Link>
  );
};

export default ClientCard;
