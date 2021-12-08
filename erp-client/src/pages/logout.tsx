import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { logout } from '../lib/api/post';
import { userIdState } from '../lib/state';

const LogoutPage = () => {
  const setUserId = useSetRecoilState(userIdState);
  const router = useRouter();

  useEffect(() => {
    const logoutOnServer = async () => {
      try {
        await logout();
      } catch (err) {
        console.log(err);
      } finally {
        setUserId(null);
        router.push('/login');
      }
    };
    logoutOnServer();
  });

  return null;
};

export const getServerSideProps = async (context: NextPageContext) => {
  // backend 에서 res.cookie("token", token, ...) 으로 설정한 cookie
  const { token } = cookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    };
  }

  return { props: {} };
};

export default LogoutPage;
