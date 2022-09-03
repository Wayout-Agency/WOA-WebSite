import AdminLayout from "@/components/AdminPanel/AdminLayout";
import UDQuestionService from "@/components/AdminPanel/QuestionService/UDQuestionService";
import { useRouter } from "next/router";

const AdminAlbums = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout>
      <UDQuestionService id={id} />
    </AdminLayout>
  );
};
export default AdminAlbums;
