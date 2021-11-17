import { BASEURL } from '..';
const deleteImage = async (imageUrl: string) => {
  try {
    const data = await fetch(`${BASEURL}/pages/${imageUrl}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    console.log('[SUCCESS] DELETE image data');

    return data;
  } catch (err) {
    console.log('[FAIL]', err);
  }
};

export default deleteImage;
