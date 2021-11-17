import { faLightbulb, faUser } from '@fortawesome/free-regular-svg-icons';
import { faColumns, faEdit, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { UserStateContext } from '../../context/UserContext';
import { loadModelData } from '../../lib/api/useGets';
import { uploadData } from '../../lib/api/usePosts';
import savePlot from '../../lib/api/usePosts/savePlot';
import { modelDataState, selectedPlotState, userIdState } from '../../lib/state';

const TabBarWrapper = styled.div`
  display: flex;
  position: sticky;
  bottom: 1rem;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 4px rgba(186, 186, 186, 0.25);
  background: #ffffff;
`;

const IconBarWrapper = styled.span`
  margin: 1rem;
  cursor: pointer;
  color: rgb(63.7%, 67.1%, 74.5%);
  font-size: 1.5rem;
`;

const IconWrapper = styled(FontAwesomeIcon)`
  margin: 1rem;
  cursor: pointer;
  color: rgb(63.7%, 67.1%, 74.5%);
  font-size: 35px;
`;

const Divider = styled.div`
  margin: 0;
  background-color: rgb(91.8%, 92.4%, 93.7%);
  width: 1px;
  height: 100%;
`;

const ButtonBarWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
`;

const ButtonWrapper = styled.button`
  margin: 0.5rem;
  border: none;
  border-radius: 3px;
  background-color: rgb(91.8%, 92.4%, 93.7%);
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const LabelWrapper = styled.label`
  margin: 0.5rem;
  border: none;
  border-radius: 3px;
  background-color: rgb(91.8%, 92.4%, 93.7%);
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
`;

const InputWrapper = styled.input`
  display: none;
  position: absolute;
`;

const TabBar = () => {
  const state = useContext(UserStateContext);
  const router = useRouter();
  const [fileId, setFileId] = useState<string | null>(null);
  const [modelData, setModelData] = useRecoilState(modelDataState);
  const selectedPlot = useRecoilValue(selectedPlotState);
  const userId = useRecoilValue(userIdState);
  const isAuth = state.isAuth;

  const handleClickDashboard = () => {
    isAuth ? router.push('/pages') : router.push('/');
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      userId && formData.append('user_id', userId);
      e.target.files && formData.append('file', e.target.files[0]);
      if (userId) {
        const loadData = await uploadData(formData);
        setFileId(loadData.fileId);
        const generatedData = await loadModelData(loadData.fileId);
        setModelData(generatedData.plots);
      }
    }
    e.target.files = null;
  };

  const handlePlotSave = async () => {
    fileId && selectedPlot && (await savePlot(fileId, selectedPlot));
  };

  return (
    <TabBarWrapper>
      <IconBarWrapper>
        <IconWrapper icon={faColumns} onClick={handleClickDashboard} />
        <IconWrapper icon={faEdit} />
        <IconWrapper icon={faLightbulb} onClick={() => router.push('/recommend')} />
        {!isAuth && <IconWrapper icon={faSignInAlt} onClick={() => router.push('/login')} />}
        {isAuth && (
          <>
            <IconWrapper icon={faUser} onClick={() => router.push('/account')} />
            <IconWrapper icon={faSignOutAlt} onClick={() => router.push('/logout')} />
          </>
        )}
      </IconBarWrapper>
      {router.pathname.includes('/pages') && (
        <>
          <Divider />
          <ButtonBarWrapper>
            <ButtonWrapper onClick={() => router.push('/')}>Create New Page</ButtonWrapper>
          </ButtonBarWrapper>
        </>
      )}
      {router.pathname.includes('/p/') && (
        <>
          <Divider />
          <ButtonBarWrapper>
            <ButtonWrapper onClick={() => router.push('/pages')}>SAVE</ButtonWrapper>
            <ButtonWrapper onClick={() => router.back()}>Go Back</ButtonWrapper>
          </ButtonBarWrapper>
        </>
      )}
      {router.pathname.includes('/recommend') && (
        <>
          <Divider />
          <ButtonBarWrapper>
            <form>
              <LabelWrapper>
                LOAD
                <InputWrapper type='file' name='file' onChange={handleChange} />
              </LabelWrapper>
            </form>
            {selectedPlot && <ButtonWrapper onClick={handlePlotSave}>SAVE</ButtonWrapper>}
          </ButtonBarWrapper>
        </>
      )}
    </TabBarWrapper>
  );
};

export default TabBar;
