import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

import TabBar from './TabBar';

const HeaderWrapper = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
  padding: 0;
  width: 100%;

  > img {
    opacity: 0.75;
    margin: 20px 10px 20px 0;

    :hover {
      opacity: 1;
    }
  }
`;

const ContentWrapper = styled.main`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

type ChildrenType = {
  children: any;
};

const Layout = ({ children }: ChildrenType) => {
  return (
    <div id='layoutRoot'>
      <Head>
        <title>ERP</title>
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <HeaderWrapper>
        <Link href='https://github.com/leahincom' passHref>
          <img src='/assets/images/Lah.png' width='25px' height='25px' alt='JungHyunLah' />
        </Link>
        <Link href='https://github.com/yskim0' passHref>
          <img src='/assets/images/Kim.png' width='30px' height='30px' alt='YonsooKim' />
        </Link>
      </HeaderWrapper>
      <ContentWrapper>{children}</ContentWrapper>
      <TabBar />
    </div>
  );
};

export default Layout;
