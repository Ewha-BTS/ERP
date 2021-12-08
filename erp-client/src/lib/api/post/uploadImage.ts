import { BASEURL } from '..';
const uploadImage = async (pageId: string, formData: FormData) => {
  try {
    const data = await fetch(`${BASEURL}/pages/images?pageId=${pageId}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    }).then((res) => res.json());

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default uploadImage;
