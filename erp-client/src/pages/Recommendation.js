import React, { useState } from "react";

import Graph from "../components/main/Graph";
import RecBar from "../components/main/RecBar";

const Recommendation = ({ data }) => {
  console.log(data);

  return (
    <>
      <Graph />
      <RecBar graph={data} />
    </>
  );
};

export default Recommendation;
