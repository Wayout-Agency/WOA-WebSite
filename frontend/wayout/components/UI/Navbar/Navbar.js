import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import navigation from "./navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a>
          <Image
            src="/static/img/logo.svg"
            width="220px"
            height="45px"
            className={styles.logoImg}
            alt="logo"
          />
        </a>
      </Link>
      <motion.div className={styles.links}>
        {navigation.map(({ id, title, path }, index) => (
          <Link key={id} href={path}>
            <motion.a
              className={pathname === path ? styles.active : styles.link}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: Number("0." + index + 1), duration: 0.8}}
            >
              {title}
            </motion.a>
          </Link>
        ))}
      </motion.div>
    </nav>
  );
};

export default Navbar;
