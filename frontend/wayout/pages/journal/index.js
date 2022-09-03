import Journal from "@/components/Journal";
import Head from "next/head";

const JournalPage = () => {
  return (
    <>
      <Head>
        <title>Журнал</title>
        <meta
          name="description"
          content="Читайте статьи про школу, альбомы, мероприятия, фотографию и многое другое."
        />
      </Head>
      <Journal />
    </>
  );
};

export default JournalPage;
