import "../styles/globals.scss";
import Layout from "@/components/Global/Layout";
import AppWrapper from "@/components/AppWrapper";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  );
};

export default MyApp;
