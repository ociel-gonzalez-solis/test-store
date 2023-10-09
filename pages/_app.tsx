import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import { lightTheme } from "@/themes";
import { UIProvider } from "@/context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 500,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UIProvider>
        <ThemeProvider theme={lightTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </SWRConfig>
  );
}
