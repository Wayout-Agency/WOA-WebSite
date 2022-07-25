import AdminHeader from "./AdminHeader";
import useSWR from "swr";
import AuthForm from "./AuthForm";
import { rootWayoutAPI } from "services/wayoutApi";

const AdminLayout = ({ children }) => {
  const verifyEndpoint = "/token/";

  const fetcher = async () => {
    const client = await rootWayoutAPI();
    await client.get(verifyEndpoint);
  };

  const { error } = useSWR(verifyEndpoint, fetcher);
  if (error) return <AuthForm />;

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default AdminLayout;
