import { MODELURL } from '..';

const uploadData = async (formData: FormData) => {
  try {
    const data = await fetch(`${MODELURL}/upload`, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());

    console.log('[SUCCESS] UPLOAD data', data);
    return data;
  } catch (err) {
    console.log('[FAIL] UPLOAD data', err);
    alert('파일 로딩에 실패하였습니다.');
    return null;
  }
};

export default uploadData;
