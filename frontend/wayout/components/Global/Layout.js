import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import BurgerMenu from "../UI/BurgerMenu";
import { useAppContext } from "../AppWrapper";
import FeedbackForm from "../UI/FeedbackForm";
import Head from "next/head";
import Script from "next/script";

const Layout = ({ children }) => {
  const [click, setClick] = useState(false);
  const { show, setShow, order } = useAppContext();

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
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-9VDQGQ3TT5"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || []; function gtag()
        {dataLayer.push(arguments);}
        gtag('js', new Date()); gtag('config', 'G-9VDQGQ3TT5');
        `}
      </Script>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
         (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
         var z = null;m[i].l=1*new Date();
         for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
         k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
         (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
         ym(90215618, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
         });  
        `}
      </Script>
      <Script>
        {`
        (function(w, d, s, o){
          var j = d.createElement(s); j.async = true; j.src = '//script.marquiz.ru/v2.js';j.onload = function() {
            if (document.readyState !== 'loading') Marquiz.init(o);
            else document.addEventListener("DOMContentLoaded", function() {
              Marquiz.init(o);
            });
          };
          d.head.insertBefore(j, d.head.firstElementChild);
        })(window, document, 'script', {
            host: '//quiz.marquiz.ru',
            region: 'eu',
            id: '63887bc75d7f8f0050751941',
            autoOpen: 10,
            autoOpenFreq: 'once',
            openOnExit: true,
            disableOnMobile: false
          }
        );
      `}
      </Script>
      <Head>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/90215618"
              style={{ position: "absolute", left: -9999 }}
              alt=""
            />
          </div>
        </noscript>
        <meta
          property="og:title"
          content="Школьные выпускные альбомы - Wayout Agency"
        />
        <meta
          property="og:deScription"
          content="Хватит обсуждать! Закажите альбом мечты сейчас. Мы делаем школьные альбомы по всей России. Современный дизайн, профессиональные фотографы - это про нас."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wayout.agency/" />
        <meta property="og:image" content="https://wayout.agency/OG.jpg" />
      </Head>
      <Header click={click} setClick={setClick} width={width} />
      {breakpoint > width ? (
        <BurgerMenu click={click} setClick={setClick} />
      ) : (
        <></>
      )}
      <FeedbackForm setShow={setShow} show={show} order={order} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
