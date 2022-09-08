import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { useRouter } from "next/router";
import UDArticle from "@/components/AdminPanel/Journal/UDArticle";
const UpdateDeleteArticle = () => {
  const { query } = useRouter();
  return (
    <AdminLayout>
      <UDArticle id={query.id} />
    </AdminLayout>
  );
};

export default UpdateDeleteArticle;
