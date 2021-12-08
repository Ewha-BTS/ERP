import { BASEURL } from '..';
const getAccount = async (headers: Headers) => {
  try {
    const data = await fetch(`${BASEURL}/users/account`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getAccount;
