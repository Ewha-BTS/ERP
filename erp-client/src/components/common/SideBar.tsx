/* eslint-disable indent */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { VegaLite, VisualizationSpec } from 'react-vega';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getSavedPlots, getUploadHistory } from '../../lib/api/get';
import { isSideBarOpen, modelDataState, selectedPlotState, userIdState } from '../../lib/state';
import { PlotType, PlotDataType, FileType } from '../../lib/type';

const SideBarWrapper = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 0;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  background: #f4f6fc;
  width: 40%;
  height: 100%;
  /* overflow-y: scroll; */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  &.shrink {
    width: 10%;

    > * {
      visibility: hidden;
    }

    .arrow {
      visibility: visible;
      transform: rotate(180deg);
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 40px 30px;
  width: 100%;

  :hover {
    cursor: pointer;
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const OptionWrapper = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 700;
`;

const VegaLiteWrapper = styled.div`
  padding-bottom: 1rem;

  :hover {
    cursor: pointer;
  }
`;

const SideBar = () => {
  const modelData = useRecoilValue(modelDataState);
  const setSelectedPlot = useSetRecoilState(selectedPlotState);
  const [isVisible, setIsVisible] = useRecoilState(isSideBarOpen);
  const [spec, setSpec] = useState<VisualizationSpec[] | null>(null);
  const [values, setValues] = useState<PlotDataType[] | null>(null);
  const [fileList, setFileList] = useState<[string[]] | null>(); // history: [[file_id, file_name], ...]
  const [fileId, setFileId] = useState<string | null>();
  const [savedPlots, setSavedPlots] = useState<PlotType[] | null>();
  const userId = useRecoilValue(userIdState);
  const router = useRouter();

  useEffect(() => {
    const getFiles = async () => {
      if (userId) {
        const files = await getUploadHistory(userId);
        files && setFileList(files.history);
      }
    };
    if (router.pathname.includes('/p/') && isVisible) {
      getFiles();
    }
  }, []);

  useEffect(() => {
    const tempSpec: VisualizationSpec[] = [];
    const tempValues: PlotDataType[] = [];
    modelData?.forEach((plot: PlotType) => {
      tempSpec.push({
        description: 'recommended data',
        mark: plot.mark,
        encoding: JSON.parse(JSON.stringify(plot.encoding)),
        data: { name: 'table' },
        padding: 5,
      });
      tempValues.push({ table: JSON.parse(JSON.stringify(plot.data.values)) });
    });
    setSpec(tempSpec);
    setValues(tempValues);
    setIsVisible(true);
  }, [modelData]);

  useEffect(() => {
    const tempSpec: VisualizationSpec[] = [];
    const tempValues: PlotDataType[] = [];
    savedPlots?.forEach((plot: PlotType) => {
      tempSpec.push({
        description: 'saved plots',
        mark: plot.mark,
        encoding: JSON.parse(JSON.stringify(plot.encoding)),
        data: { name: 'table' },
        padding: 5,
      });
      tempValues.push({ table: JSON.parse(JSON.stringify(plot.data.values)) });
    });
    setSpec(tempSpec);
    setValues(tempValues);
    setIsVisible(true);
  }, [savedPlots]);

  const handleFileClick = async (id: string) => {
    setFileId(id);
    const plots = await getSavedPlots(id);
    setSavedPlots(plots);
  };

  const handlePlotClick = (idx: number) => {
    modelData && setSelectedPlot(modelData[idx]);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <SideBarWrapper className={[!isVisible && 'shrink'].join(' ')}>
      <IconWrapper onClick={() => setIsVisible(!isVisible)}>
        <img src='/assets/icons/FoldArrow.svg' className='arrow' />
      </IconWrapper>
      <DataWrapper>
        {router.pathname.includes('/p/') && fileList && !fileId
          ? fileList.map((file) => (
              <OptionWrapper key={file[0]} onClick={() => handleFileClick(file[0])}>
                {file[1]}
              </OptionWrapper>
            ))
          : spec &&
            values &&
            spec.map((info, idx) => (
              <VegaLiteWrapper key={idx} onClick={() => handlePlotClick(idx)}>
                <VegaLite spec={info} data={values[idx]} />
              </VegaLiteWrapper>
            ))}
      </DataWrapper>
    </SideBarWrapper>
  );
};

export default SideBar;
