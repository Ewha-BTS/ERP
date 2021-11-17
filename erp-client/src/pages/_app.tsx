import cookies from 'next-cookies';
import App, { AppContext } from 'next/app';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import Layout from '../components/common/Layout';
import UserProvider from '../context/UserContext';
import GlobalStyle from '../styles/GlobalStyle';
import 'fontsource-nunito-sans';
import 'fontsource-roboto';

interface newAppProps extends AppProps {
  isAuthenticated: boolean;
}

function MyApp({ Component, pageProps, isAuthenticated }: newAppProps) {
  return (
    <RecoilRoot>
      <UserProvider isAuthenticated={isAuthenticated}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </RecoilRoot>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  let isAuthenticated: boolean = false;

  const { token } = cookies(context.ctx);
  if (token) {
    isAuthenticated = true;
  }

  const appProps = await App.getInitialProps(context);
  return { ...appProps, isAuthenticated };
};

export default MyApp;
