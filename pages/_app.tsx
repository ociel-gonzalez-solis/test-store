import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { lightTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
