import { MODELURL } from '..';
import { PlotType } from '../../type';

const savePlot = async (fileId: string, plot: PlotType) => {
  try {
    const save = await fetch(`${MODELURL}/save`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file_id: fileId,
        plot,
      }),
    }).then((res) => res.json());

    console.log('[SUCCESS] SAVE plot data', save);
    return save;
  } catch (err) {
    console.log('[FAIL] SAVE plot data', err);
    alert('플랏 저장에 실패하였습니다.');
    return null;
  }
};

export default savePlot;
