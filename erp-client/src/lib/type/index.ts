import { AnyMark } from 'vega-lite/build/src/mark';

export type PositionType = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type ItemType = {
  id: string;
  label: string;
  action: () => void;
};

export type BlockType = {
  _id?: string;
  id?: string;
  tag: string;
  html: string;
  imageUrl: string;
};

export type StateType = {
  htmlBackup: string | null;
  html: string;
  tag: string;
  imageUrl: string;
  placeholder: boolean;
  previousKey: string | null;
  isTyping: boolean;
  tagSelectorMenuOpen: boolean;
  tagSelectorMenuPosition: {
    x: number | null;
    y: number | null;
  };
  actionMenuOpen: boolean;
  actionMenuPosition: {
    x: number | null;
    y: number | null;
  };
};

export type PageType = {
  _id: string;
  updatedAt: string;
  blocks: BlockType[];
  errCode: number;
};

export type DataType = {
  message: string;
  page: PageType;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type FormType = {
  [x: string]: string;
};

export type ModelType = {
  message?: string;
  plots: PlotType[];
};

export type ValuesType = {
  values: any[];
};

export type EncodingType = {
  detail: {
    field?: string;
    primitiveType?: string;
    selected?: boolean;
    type?: string;
  };
  x: {
    bin?: boolean;
    field?: string;
    type?: string;
  };
  y: {
    aggregate?: string;
    field?: string;
    type?: string;
  };
};

export type PlotType = {
  data: ValuesType;
  encoding: EncodingType;
  mark: AnyMark;
};

export type PlotDataType = {
  table: any[];
};

export type FileType = {
  id?: string;
  name?: string;
};
