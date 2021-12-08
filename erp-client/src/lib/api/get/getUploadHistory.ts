import { MODELURL } from '..';

const getUploadHistory = async (userId: string) => {
  try {
    const history = await fetch(`${MODELURL}/get_upload_history/${userId}`, {
      method: 'GET',
    }).then((res) => res.json());

    console.log('[SUCCESS] GET history data', history);
    return history;
  } catch (err) {
    console.log('[FAIL] GET history data', err);
    alert('파일 히스토리 로딩에 실패하였습니다.');
    return null;
  }
};

export default getUploadHistory;
