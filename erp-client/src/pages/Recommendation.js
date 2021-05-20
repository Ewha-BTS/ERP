import React, { useState } from "react";

import Graph from "../components/main/Graph";
import RecBar from "../components/main/RecBar";

const Recommendation = () => {
  const [graph, setGraph] = useState(null);

  return (
    <>
      <Graph />
      <RecBar graph={graph} />
    </>
  );
};

export default Recommendation;
