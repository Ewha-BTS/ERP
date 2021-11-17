import { BASEURL } from '..';
import { BlockType } from '../../type';

const postPages = async (headers: Headers, blocks: BlockType[]) => {
  try {
    const data = await fetch(`${BASEURL}/pages`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        blocks,
      }),
    }).then((res) => res.json());

    console.log('[SUCCESS] POST pages data', data);

    return data;
  } catch (err) {
    console.log('[FAIL] POST pages data', err);
  }
};

export default postPages;
