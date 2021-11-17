import { BASEURL } from '..';
const getPages = async (headers: Headers) => {
  try {
    const data = await fetch(`${BASEURL}/pages`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());

    console.log('[SUCCESS] GET pages data', data);

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getPages;
