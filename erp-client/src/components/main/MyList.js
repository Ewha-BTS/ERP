import React, { useState } from "react";

import styled from "styled-components";

const MyListWrap = styled.div`
  .myList {
    position: absolute;
    margin: 0;
    background-color: rgb(96.1%, 96.1%, 96.1%);
    top: 0;
    right: 0;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0.5rem;
      margin-bottom: 0;
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

const MyList = () => {
  const [graph, setGraph] = useState(true);

  return (
    <MyListWrap>
      <div className="myList">
        <div className="myList__title">Save Plots</div>
        <div className="myList__body"></div>
      </div>
    </MyListWrap>
  );
};

export default MyList;
