import React from "react";

import styled from "styled-components";

const SideBarWrap = styled.div`
  .sideBar {
    position: absolute;
    margin: 0;
    background-color: rgb(96.1%, 96.1%, 96.1%);
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;

    > * {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
    }

    &__title {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.5rem;
      padding: 1rem;
      font-weight: bold;
      background-color: rgb(91.8%, 92.4%, 93.7%);
      border-radius: 5px;
    }

    &__body {
      position: relative;
      background-color: rgb(91.8%, 92.4%, 93.7%);
      height: 100%;
      width: 95%;
      margin-bottom: 1rem;
    }
  }
`;

const SideBar = ({ graph }) => {
  // 각 페이지에 맞게 sidebar의 내용 바꾸기
  // 일단 지금은 recommendation page에 맞게 설정되어 있음

  return (
    <SideBarWrap>
      <div className="sideBar">
        <div className="sideBar__rec">
          <div className="sideBar__title">Recommended</div>
          <div className="sideBar__body"></div>
        </div>
        {graph ? (
          <div className="sideBar__edit">
            <div className="sideBar__title">Edit Plot</div>
            <div className="sideBar__body"></div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </SideBarWrap>
  );
};

export default SideBar;
