import styles from "./Graduation.module.scss";
import Image from "next/image";
import Link from "next/link";

const Graduation = () => {
  return (
    <Link href={"/graduations"}>
      <div className={styles.bgWrapper}>
        <Image
          className={styles.bgImg}
          alt="travel"
          src="/static/img/graduation.png"
          layout="fill"
          objectFit="cover"
        />
        <div className={styles.titleWrapper}>
          <p className={styles.title}>Наши выпускные</p>
          <p className={styles.watch}>Cмотреть</p>
        </div>
      </div>
    </Link>
  );
};

export default Graduation;
