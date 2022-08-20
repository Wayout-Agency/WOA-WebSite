import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import BurgerMenu from "../UI/BurgerMenu";

const Layout = ({ children }) => {
  const [click, setClick] = useState(false);

  const [width, setWidth] = useState(0);
  const breakpoint = 1280;

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  return (
    <>
      <Header click={click} setClick={setClick} width={width} />
      {breakpoint > width ? <BurgerMenu click={click} setClick={setClick} /> : <></>}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
