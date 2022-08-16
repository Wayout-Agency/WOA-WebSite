import styles from "../Journal.module.scss";
import Image from "next/image";
import Link from "next/link";

const Card = ({ filePath, title, width, link }) => {
  return (
    <Link href={link}>
      <div className={styles.block} style={{ width: `${width}%` }}>
        <div className={styles.imgBlockWrapper}>
          <Image className={styles.img} layout="fill" src={filePath} />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
    </Link>
  );
};

export default Card;
