import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import navigation from "./navigation";
import { motion } from "framer-motion";
import { enablePageScroll } from "scroll-lock";
import Burger from "./Burger";

const Navbar = ({ click, setClick, width }) => {
  const breakpoint = 1280;
  const { pathname } = useRouter();
  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a
          className={styles.logoImg}
          onClick={() => {
            if (click) {
              enablePageScroll();
              setClick(false);
            }
          }}
        >
          <Image
            src="/static/img/logo.svg"
            width="220px"
            height="45px"
            alt="logo"
          />
        </a>
      </Link>
      {width > breakpoint ? (
        <motion.div className={styles.links}>
          {navigation.map(({ id, title, path }, index) => (
            <Link key={id} href={path}>
              <motion.a
                className={pathname === path ? styles.active : styles.link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: Number("0." + index + 1), duration: 0.8 }}
              >
                {title}
              </motion.a>
            </Link>
          ))}
        </motion.div>
      ) : (
        <Burger click={click} setClick={setClick} />
      )}
    </nav>
  );
  z;
};

export default Navbar;
