import React from "react";
import vegaEmbed from "vega-embed";
import styled from "styled-components";

const GraphWrap = styled.div``;

const Graph = ({ idx }) => {
  return (
    <>
      <GraphWrap>
        <div className={"recBar__body--graph" + { idx }}></div>
      </GraphWrap>
    </>
  );
};

export default Graph;
