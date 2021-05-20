import React, { useState } from "react";

import Graph from "../components/main/Graph";
import SideBar from "../components/main/SideBar";

const Recommendation = () => {
  const [graph, setGraph] = useState(null);

  return (
    <div>
      <Graph />
      <SideBar graph={graph} />
    </div>
  );
};

export default Recommendation;
