import ArticleCard from "@/components/ArticleCard";

import { useRouter } from "next/router";

const ArticleCardPage = () => {
  const { query } = useRouter();
  return (
    <ArticleCard slug={query.slug}/>
  );
};

export default ArticleCardPage;
