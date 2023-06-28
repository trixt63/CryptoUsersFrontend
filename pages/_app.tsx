import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
//
import HighchartsGlobalConfig from 'src/components/highcharts/HighchartsGlobalConfig';
import RouteChangeLoading from 'src/components/Loading/RouteChangeLoading';
import { Meta } from 'src/components/Meta';
import createEmotionCache from 'src/createEmotionCache';
import { useCheckAuthorization } from 'src/hooks/useAuthorization';
import { store } from 'src/redux/store';
import { getThemeConfig } from 'src/theme';
import { WagmiProvider } from 'src/wagmi';
//
import ShareCover from 'public/share_cover.png';
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

const Checker = () => {
  useCheckAuthorization();

  return null;
};

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);

  const theme = useMemo(() => responsiveFontSizes(createTheme(getThemeConfig())), []);

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Meta
          title={'Ranking Center'}
          description={'An all-in-one platform for ranking and scoring entire blockchain entities.'}
          imageUrl={ShareCover.src}
          url={'https://centic.io'}
          keywords={'scoring system, tracking, ranking, blockchain, analysis'}
        />
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <ToastContainer
              limit={3}
              theme="light"
              hideProgressBar
              toastStyle={{
                // eslint-disable-next-line quotes
                '--toastify-font-family': "'Montserrat',sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            />
            <CssBaseline />
            <RouteChangeLoading />

            <WagmiProvider>
              <HighchartsGlobalConfig />
              <Checker />
              {getLayout(<Component {...pageProps} />)}
            </WagmiProvider>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-PXCR7NM");
          `,
        }}
      />
    </>
  );
}

export default MyApp;
