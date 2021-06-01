import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import vegaEmbed from "vega-embed";

import { recommendState } from "../../lib/state";
import Graph from "../common/Graph";

const RecBarWrap = styled.div`
  .recBar {
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
      display: flex;
      width: 95%;
      justify-content: center;
      cursor: pointer;

      > * {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.5rem;
        margin-bottom: 0;
        padding: 1rem;
        font-weight: bold;
        background-color: rgb(86.2%, 87.3%, 89.8%);
        border-radius: 5px;

        &:hover {
          background-color: rgb(77.4%, 79.7%, 86.6%);
        }
      }

      &--recommend {
        margin-right: 0;
      }

      &--edit {
        margin-left: 0;
      }

      .selected {
        background-color: rgb(91.8%, 92.4%, 93.7%);
      }
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

const RecBar = ({ graph }) => {
  // 각 페이지에 맞게 sidebar의 내용 바꾸기
  // 일단 지금은 recommendation page에 맞게 설정되어 있음
  // graph = true;

  const [loadData, setLoadData] = useRecoilState(recommendState);

  const handleClick = (e) => {
    document.querySelector(".selected").classList.remove("selected");
    e.target.classList.add("selected");
  };

  // const encodeData = () => {
  //   loadData.forEach(async (data, idx) => {
  //     await vegaEmbed(`.recBar__body--graph${idx}`, data);
  //   });
  // };

  return (
    <RecBarWrap>
      <script src="https://cdn.jsdelivr.net/npm/vega@5.20.2"></script>
      <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.1.0"></script>
      <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.17.0"></script>
      <div className="recBar">
        <div className="recBar__title">
          {/* useRef, ref 사용해보기 */}
          <div
            className="recBar__title--recommend selected"
            onClick={handleClick}
          >
            Recommended
          </div>
          {graph ? (
            <div className="recBar__title--edit" onClick={handleClick}>
              Edit Plot
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="recBar__body">
          {/* {loadData.map(async (data, idx) => {
            return await (<Graph key={idx} idx={idx} />);
          })} 
          const graph = [data];
          */}
          {loadData.forEach((data) => vegaEmbed(`.recBar__body`, data))}
        </div>
      </div>
    </RecBarWrap>
  );
};

export default RecBar;
