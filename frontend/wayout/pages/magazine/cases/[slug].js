import CaseCard from "@/components/CaseCard";

import { useRouter } from "next/router";

const CaseCardPage = () => {
  const { query } = useRouter();
  return (
    <CaseCard slug={query.slug}/>
  );
};

export default CaseCardPage;
