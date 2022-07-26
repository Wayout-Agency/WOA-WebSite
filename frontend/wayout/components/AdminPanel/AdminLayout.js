import AdminHeader from "./AdminHeader";
import useSWR from "swr";
import AuthForm from "./AuthForm";
import { rootWayoutAPI } from "services/wayoutApi";

const AdminLayout = ({ children }) => {
  const verifyEndpoint = "/token/";

  const fetcher = async () => {
    const client = await rootWayoutAPI();
    let response = await client.get(verifyEndpoint);
    return response.data.message;
  };

  const { data, error } = useSWR(verifyEndpoint, fetcher);
  if (!data) return <AuthForm />;
  if (error) return <AuthForm />;

  return (
    <>
      <AdminHeader />
      {children}
    </>
  );
};

export default AdminLayout;
