import Link from "next/link";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import navigation from "./navigation";

const Navbar = () => {
  const { pathname } = useRouter();

  return (
    <nav className={styles.nav}>
      <Link href="/">
        <a className={styles.logo}>
          <Image
            src="/static/img/logo.svg"
            width="220px"
            height="45px"
            className={styles.logoImg}
            alt="logo"
          />
        </a>
      </Link>
      <div className={styles.links}>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            <a className={pathname === path ? styles.active : styles.link}>
              {title}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
