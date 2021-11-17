import { MODELURL } from '..';

import { PlotType } from './../../type';

const savePlot = async (fileId: string, plot: PlotType) => {
  try {
    const data = await fetch(`${MODELURL}/save`, {
      method: 'POST',
      body: JSON.stringify({
        file_id: fileId,
        plot,
      }),
    }).then((res) => res.json());

    console.log('[SUCCESS] SAVE plot data', data);
    return data.data;
  } catch (err) {
    console.log('[FAIL] SAVE plot data', err);
    alert('플랏 저장에 실패하였습니다.');
    return null;
  }
};

export default savePlot;
