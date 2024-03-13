import { FunctionComponent, useMemo } from "react";
import Head from "next/head";
import { usePlatform } from "@/helpers/platformContext";
import { useDevice } from "@/helpers/deviceContext";
import hexRgb from "hex-rgb";

const Layout: FunctionComponent = ({ children }) => {
  const { isMobile } = useDevice();
  const platform = usePlatform();
  const activeColorHex = platform.color || "#F4213B";
  const { red, green, blue } = useMemo(
    () => hexRgb(activeColorHex),
    [activeColorHex]
  );

  return (
    <>
      <Head>
        <style>
          {`:root {--active-color: ${activeColorHex}; --active-color-red: ${red}; --active-color-green: ${green}; --active-color-blue: ${blue}; }`}
        </style>
        <link rel="shortcut icon" href={platform.favicon_url} />
        <meta
          name="viewport"
          content={isMobile ? "width=device-width" : "width=1200"}
        />
        <meta
          name="yandex-verification"
          content={platform.analytics.yandex_verification}
        />
        <meta
          name="google-site-verification"
          content={platform.analytics.google_verification}
        />
      </Head>
      {children}
    </>
  );
};

export default Layout;
