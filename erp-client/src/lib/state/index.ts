import { atom, selector } from 'recoil';

import { PlotType } from '../type';

export const loginState = atom<boolean>({
  key: 'login',
  default: false,
});

export const userIdState = atom<string | null>({
  key: 'userId',
  default: null,
});

export const modelDataState = atom<PlotType[] | null>({
  key: 'modelData',
  default: null,
});

export const selectedPlotState = atom<PlotType | null>({
  key: 'selectedPlot',
  default: null,
});

export const isSideBarOpen = atom<boolean>({
  key: 'isSideBarOpen',
  default: false,
});
