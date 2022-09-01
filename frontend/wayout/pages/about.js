import About from "@/components/About";
import Head from "next/head";
const AboutPage = () => {
  return (
    <>
      <Head>
        <title>Об агенстве Wayout</title>
        <meta
          name="description"
          content="Wayout Agency - мы делаем школьные альбомы и организуем выпускные. Большая команда, дизайнеров, фотографов."
        />
      </Head>
      <About />
    </>
  );
};

export default AboutPage;
