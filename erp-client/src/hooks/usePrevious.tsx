import { useRef, useEffect } from 'react';

import { BlockType } from '../lib/type';

const usePrevious = (value: BlockType[]) => {
  const ref = useRef<BlockType[]>([]);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
