import styles from "../About.module.scss";
import Image from "next/image";

const AboutCard = ({ name, role, isSuper, index }) => {
  return (
    <div className={styles.aboutCardWrapper}>
      <Image
        src={`/static/img/team/team_${index}.jpeg`}
        className={styles.aboutCardImg}
        width={350}
        height={407}
      />
      <h3 className={styles.aboutCardTitle}>{name}</h3>
      <p className={styles.aboutCardRole}>{role}</p>
    </div>
  );
};

export default AboutCard;
