import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { useRouter } from "next/router";
import UDCase from "@/components/AdminPanel/Journal/UDCase";

const UpdateDeleteCase = () => {
  const { query } = useRouter();
  return (
    <AdminLayout>
      <UDCase id={query.id} />
    </AdminLayout>
  );
};

export default UpdateDeleteCase;
