import React, { useEffect, useState } from 'react';

import SideBar from '../components/common/SideBar';
import Dashboard from '../components/recommend/Dashboard';

import { PageProps } from '.';

const Recommendation = ({ pid, blocks, err }: PageProps) => {
  return (
    <>
      <SideBar />
      <Dashboard />
    </>
  );
};

export default Recommendation;
