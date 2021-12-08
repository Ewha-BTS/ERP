import { MODELURL } from '..';

const getSavedPlots = async (fileId: string) => {
  try {
    const data = await fetch(`${MODELURL}/get_save_plots/${fileId}`, {
      method: 'GET',
    }).then((res) => res.json());

    console.log('[SUCCESS] GET saved plots', data);
    return data;
  } catch (err) {
    console.log('[FAIL] GET saved plots', err);
    alert('저장된 플랏 로딩에 실패하였습니다.');
    return null;
  }
};

export default getSavedPlots;
