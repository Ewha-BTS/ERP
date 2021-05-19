import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import styled from "styled-components";

const TabBarWrap = styled.div``;

const TabBar = ({ data }) => {
  return (
    <TabBarWrap>
      <div className="tab-bar">
        <FontAwesomeIcon icon={faColumns} />
        <FontAwesomeIcon icon={faEdit} />
        <FontAwesomeIcon icon={faLightbulb} />
        <FontAwesomeIcon icon={faUser} />
      </div>
      {data ? (
        <div className="graph__button">
          <button className="load__button">load</button>
          <button className="save__button">save</button>
        </div>
      ) : (
        <></>
      )}
    </TabBarWrap>
  );
};

export default TabBar;
