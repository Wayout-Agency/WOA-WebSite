import journalStyles from "./../Albums/Albums.module.scss";
import panelStyles from "../AdminPanel.module.scss";
import wayoutAPI from "services/wayoutApi";
import useSWR from "swr";
import Products from "../Albums/Products";

const Journal = () => {
  const casesApiUrl = "/posts/cases/";
  const articlesApiUrl = "/posts/articles/";

  const journalFetcher = async (url) => {
    let res = await wayoutAPI.get(url);
    return res.data;
  };

  const cases = useSWR(casesApiUrl, (casesApiUrl) =>
    journalFetcher(casesApiUrl)
  );

  const articles = useSWR(articlesApiUrl, (articlesApiUrl) =>
    journalFetcher(articlesApiUrl)
  );

  if (!(cases.data && articles.data)) return <></>;

  return (
    <div className={journalStyles.albumsWrapper}>
      <h2 className={panelStyles.title}>Журнал</h2>
      <Products
        productTitle=""
        productType="Кейс"
        productUrl="/admin/journal/case"
        data={cases.data.map(({ value }) => value)}
      />
      <Products
        productTitle=""
        productType="Статью"
        productUrl="/admin/journal/article"
        data={articles.data.map(({ value }) => value)}
      />
    </div>
  );
};

export default Journal;
