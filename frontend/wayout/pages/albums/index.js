import Albums from "@/components/Albums";
import Head from "next/head";
const AlbumsPage = () => {
  return (
    <>
      <Head>
        <title>Выпускные альбомы для 1, 4, 9, 11 классов</title>
        <meta
          name="description"
          content="Фотосессии для 1, 4, 9, 11 классов с выездом в студии и школы. Заказать эстетичный школьный альбом. Купить фотоальбом. Различные модели."
        />
      </Head>
      <Albums />
    </>
  );
};
export default AlbumsPage;
