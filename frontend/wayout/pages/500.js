import Error from "@/components/UI/Error";

const Custom500 = () => {
  return (
    <Error
      code={500}
      description={
        "Упс что-то сломалось) Но ничего, давайте вернёмся на"
      }
    />
  );
};
export default Custom500;
