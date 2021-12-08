import { NextPageContext } from 'next';
import cookies from 'next-cookies';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import SideBar from '../components/common/SideBar';
import Dashboard from '../components/recommend/Dashboard';
import { modelDataState, selectedPlotState } from '../lib/state';

import { PageProps } from '.';

const Recommendation = ({ pid, blocks, err }: PageProps) => {
  const modelData = useRecoilValue(modelDataState);
  const setSelectedPlot = useSetRecoilState(selectedPlotState);

  useEffect(() => {
    setSelectedPlot(null);
  }, [modelData]);

  return (
    <>
      <SideBar />
      <Dashboard />
    </>
  );
};

export default Recommendation;
