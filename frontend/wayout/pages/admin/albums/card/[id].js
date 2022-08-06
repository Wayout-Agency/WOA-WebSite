import AdminLayout from "@/components/AdminPanel/AdminLayout";
import { useRouter } from "next/router";
import AlbumsUDCard from "@/components/AdminPanel/Albums/UDCard";
const UpdateDeleteCard = () => {
  const { query } = useRouter();
  return (
    <AdminLayout>
      <AlbumsUDCard id={query.id}/>
    </AdminLayout>
  );
};

export default UpdateDeleteCard;
