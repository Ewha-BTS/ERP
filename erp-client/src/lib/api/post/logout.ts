import { BASEURL } from '..';
const logout = async () => {
  try {
    const data = await fetch(`${BASEURL}/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default logout;
