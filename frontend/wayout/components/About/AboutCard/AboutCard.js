import styles from "../About.module.scss";
import Image from "next/image";

const AboutCard = ({ name, role, isSuper, index }) => {
  return (
    <div className={styles.aboutCardWrapper}>
      <div className={styles.imgWrapper}>
        <Image
          src={`/static/img/team/team_${index}.jpeg`}
          className={styles.aboutCardImg}
          layout="fill"
          alt={`team-member-${index + 1}`}
        />
      </div>
      <h3 className={styles.aboutCardTitle}>{name}</h3>
      <p className={styles.aboutCardRole}>{role}</p>
    </div>
  );
};

export default AboutCard;
