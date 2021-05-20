import React from "react";

import styled from "styled-components";

const GraphWrap = styled.div`
  .graph {
    width: 70%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Graph = () => {
  return (
    <GraphWrap>
      <div className="graph">Graph</div>
    </GraphWrap>
  );
};

export default Graph;
