import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';

import Layout from '../components/common/Layout';
import GlobalStyle from '../styles/globalStyle';

import 'fontsource-nunito-sans';
import 'fontsource-roboto';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
