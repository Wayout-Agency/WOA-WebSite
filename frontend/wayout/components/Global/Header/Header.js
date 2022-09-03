import Navbar from "@/components/UI/Navbar";
import styles from "./Header.module.scss";
import { useState } from "react";
import useDocumentScrollThrottled from "utils/scroll";

const Header = ({ click, setClick, width }) => {
  const [shouldHideHeader, setShouldHideHeader] = useState(false);

  const MINIMUM_SCROLL = 1;
  const TIMEOUT_DELAY = 1;

  useDocumentScrollThrottled((callbackData) => {
    const { previousScrollTop, currentScrollTop } = callbackData;
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isMinimumScrolled = currentScrollTop > MINIMUM_SCROLL;

    setTimeout(() => {
      setShouldHideHeader(isScrolledDown && isMinimumScrolled);
    }, TIMEOUT_DELAY);
  });

  return (
    <header
      className={`${styles.header} ${
        width < 1280 ? (shouldHideHeader ? styles.hidden : null) : null
      }`}
    >
      <Navbar click={click} setClick={setClick} width={width} />
    </header>
  );
};
export default Header;
