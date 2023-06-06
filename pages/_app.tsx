import Script from "next/script";
import "./globals.css";

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
  return (
    <>
      <Script
        src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
      <div className="h-screen">
        <Component {...pageProps} />
        <div id="_root_portal"></div>
      </div>
    </>
  );
}
