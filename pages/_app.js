import "../styles/globals.css";
import { Layout } from "../components/Layout";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
          <div className="footer">© my-anime 2020</div>
        </Layout>
      </Provider>

      <style jsx>
        {`
          .footer {
            position: relative;
            right: 150px;
            text-align: end;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
