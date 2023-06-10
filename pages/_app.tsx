import Script from "next/script";
import Layout from "../components/layout";

import "moment/locale/ko";

import "../styles/globals.css";
import "../styles/react-calendar.css";

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

export default function app({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  const getLayout =
    Component.getLayout || ((page: React.ReactNode) => <Layout>{page}</Layout>);

  return (
    <>
      <Script
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
      <div>
        {getLayout(<Component {...pageProps} />)}
        <div id="_root_portal"></div>
      </div>
    </>
  );
}
