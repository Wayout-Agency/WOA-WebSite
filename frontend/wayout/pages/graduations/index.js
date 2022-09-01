import Graduations from "@/components/Graduations/graduations";
import Head from "next/head";
const GraduationsPage = () => {
  return (
    <>
      <Head>
        <title>Организация выпускных в Москве</title>
        <meta
          name="description"
          content="Выпускной вечер для вашего класса на лучших площадках города. Необычные программы, хорошая цена!"
        />
      </Head>{" "}
      <Graduations />
    </>
  );
};

export default GraduationsPage;
