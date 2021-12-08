import { BASEURL } from '..';
import { BlockType } from '../../type';

const postPages = async (headers: Headers, blocks: BlockType[]) => {
  try {
    // axios로 변경한 뒤 then 제거
    const pages = await fetch(`${BASEURL}/pages`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        blocks,
      }),
    }).then((res) => res.json());

    return pages;
  } catch (err) {
    console.log('[FAIL] POST pages data', err);
  }
};

export default postPages;
