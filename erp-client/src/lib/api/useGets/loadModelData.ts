import { MODELURL } from '..';

const loadModelData = async (id: string) => {
  try {
    const data = await fetch(`${MODELURL}/inference/${id}`, {
      method: 'GET',
    }).then((res) => res.json());

    console.log('[SUCCESS] LOAD model data', data);
    return data;
  } catch (err) {
    console.log('[FAIL] LOAD model data', err);
    alert('모델 로딩에 실패하였습니다.');
    return null;
  }
};

export default loadModelData;
