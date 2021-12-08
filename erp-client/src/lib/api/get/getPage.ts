import { BASEURL } from '..';

const getPage = async (headers: Headers, id: string | string[] | undefined) => {
  try {
    const data = await fetch(`${BASEURL}/pages/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers,
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default getPage;
