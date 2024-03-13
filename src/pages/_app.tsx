import App, { AppContext, AppProps } from "next/app";
import deviceDetector, { DeviceType } from "@/helpers/deviceDetector";
import { ReactNode } from "react";
import { getPlatform } from "@/helpers/getInstance";
import { PlatformType } from "@/helpers/types";
import { DeviceProvider } from "@/helpers/deviceContext";
import { PlatformProvider } from "@/helpers/platformContext";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

type PropsType = AppProps & { platform: PlatformType; device: DeviceType };

function MyApp({
  Component,
  pageProps,
  platform,
  device,
}: PropsType): ReactNode {
  const router = useRouter();

  return (
    <DeviceProvider value={device}>
      <PlatformProvider value={platform}>
        <Layout>
          {/* key prop https://github.com/vercel/next.js/issues/9992#issuecomment-910459956 */}
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </PlatformProvider>
    </DeviceProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const req = appContext.ctx.req;
  if (!req) return { notFound: true };
  const device = deviceDetector(req.headers["user-agent"] || "");
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  // also get platform, use Promise.all for parallel queries to speed up page load
  const [appProps, platformResult] = await Promise.all([
    App.getInitialProps(appContext),
    getPlatform(req),
  ]);

  return "notFound" in platformResult
    ? platformResult
    : { ...appProps, platform: platformResult.platform, device };
};

export default MyApp;
