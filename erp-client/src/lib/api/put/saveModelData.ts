import { BASEURL } from '..';
import { ModelType } from '../../type';

const saveModelData = async (plots: ModelType[]) => {
  try {
    const data = await fetch(`${BASEURL}/users/account`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plots,
      }),
    }).then((res) => res.json());

    console.log('[SUCCESS] POST model data');
    return data.data;
  } catch (err) {
    console.log('[FAIL] POST model data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export default saveModelData;
