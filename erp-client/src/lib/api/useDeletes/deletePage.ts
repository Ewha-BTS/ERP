import { BASEURL } from '..';
const deletePage = async (pageId: string) => {
  try {
    const data = await fetch(`${BASEURL}/pages/${pageId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());

    console.log('[SUCCESS] DELETE page data');

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default deletePage;
