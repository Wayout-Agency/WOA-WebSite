import Main from "@/components/Main";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Школьные выпускные альбомы - Wayout Agency</title>
        <meta
          name="description"
          content="Мы делаем школьные выпускные альбомы по всей России. Выпускные фотоальбомы для 1, 4, 9, 11 классов. Фотокниги Wayout для выпускников школ 2022 2023. С нами заказать альбом проще всего. Современный дизайн, профессиональные фотографы."
        />
        <meta
          name="keywords"
          content="Выпускные альбомы, школьные альбомы, организация выпускных, вэйаут, цфнщге фдигьы, wayout agency, albums, современные альбомы, фотокниги, выпускной, интернет-магазин, Москва, Санкт-Петербург, Казань, Самара, Екатеринбург, Челябинск, Новосибирск, Хабаровск, Ростов-на-Дону, Нижний Новгород"
        ></meta>
        <meta
          property="og:title"
          content="Школьные выпускные альбомы - Wayout Agency"
        />
        <meta
          property="og:description"
          content="Хватит обсуждать! Закажите альбом мечты сейчас. Мы делаем школьные альбомы по всей России. Современный дизайн, профессиональные фотографы - это про нас."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wayout.agency/" />
        <meta property="og:image" content="https://wayout.agency/OG.jpg" />
      </Head>
      <Main />
    </>
  );
}
