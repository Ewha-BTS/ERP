import React, { useState } from "react";

import Graph from "../components/main/Graph";
import RecommendBar from "../components/main/RecommendBar";
import EditBar from "../components/main/EditBar";

const Recommendation = () => {
  const [graph, setGraph] = useState(null);

  return (
    <div>
      <Graph />
      {graph ? (
        <div className="bar__option">
          <RecommendBar />
          <EditBar />
        </div>
      ) : (
        <div className="bar__option">
          <RecommendBar />
        </div>
      )}
    </div>
  );
};

export default Recommendation;
