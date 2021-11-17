import React from 'react';
import styled from 'styled-components';

import SideBar from '../components/common/SideBar';
import Dashboard from '../components/customize/Dashboard';

const UserDefineWrap = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
`;

const UserDefine = () => {
  return (
    <UserDefineWrap>
      <SideBar />
      <Dashboard />
    </UserDefineWrap>
  );
};

export default UserDefine;
