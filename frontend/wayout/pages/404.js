import Error from "@/components/UI/Error";

const Custom404 = () => {
  return (
    <Error
      code={404}
      description={
        "Кажется, страницы которую вы искали, больше нет :( Но ничего, давайте вернёмся на"
      }
    />
  );
};
export default Custom404;
