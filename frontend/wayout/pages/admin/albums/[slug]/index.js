import AdminLayout from "@/components/AdminPanel/AdminLayout";
import CreateQuestionService from "@/components/AdminPanel/QuestionService";
import { useRouter } from "next/router";
const AdminAlbums = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <AdminLayout>
      <CreateQuestionService type={slug} />
    </AdminLayout>
  );
};
export default AdminAlbums;
