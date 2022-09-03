import styles from "./Graduation.module.scss";
import Image from "next/image";
import Link from "next/link";
import Underline from "@/components/UI/Animations/Underline";
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
          <Underline>
            <p className={styles.watch}>Cмотреть</p>
          </Underline>
        </div>
      </div>
    </Link>
  );
};

export default Graduation;
