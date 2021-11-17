import React from 'react';
import { VegaLite } from 'react-vega';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { selectedPlotState } from '../../lib/state';

const DashboardWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: center;
  padding-top: 50px;
  width: 100%;
  height: 100%;
`;

const Dashboard = () => {
  const selectedPlot = useRecoilValue(selectedPlotState);

  return (
    <DashboardWrapper>
      {selectedPlot && (
        <VegaLite
          spec={{
            description: 'recommended data',
            mark: selectedPlot.mark,
            encoding: JSON.parse(JSON.stringify(selectedPlot.encoding)),
            data: { name: 'table' },
            padding: 5,
            width: 500,
            height: 500,
          }}
          data={{ table: JSON.parse(JSON.stringify(selectedPlot.data.values)) }}
        />
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
