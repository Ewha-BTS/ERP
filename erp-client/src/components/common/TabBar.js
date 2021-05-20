import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import styled from "styled-components";

const TabBarWrap = styled.div`
  .tabBar {
    width: 70%;
    position: absolute;
    bottom: 1rem;
    display: flex;
    justify-content: center;

    > * {
      padding: 5px 10px;
      background-color: rgb(96.1%, 96.1%, 96.1%);
      border-radius: 5px;
    }

    &__icon {
      > * {
        font-size: 1.5rem;
        margin: 1rem;
        color: rgb(63.7%, 67.1%, 74.5%);
      }
    }

    &__button {
      margin-left: 10px;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      > * {
        margin: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        border: none;
        background-color: rgb(91.8%, 92.4%, 93.7%);
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
`;

const TabBar = ({ data }) => {
  data = true;

  return (
    <TabBarWrap>
      <div className="tabBar">
        <div className="tabBar__icon">
          <FontAwesomeIcon className="tabBar__icon--board" icon={faColumns} />
          <FontAwesomeIcon className="tabBar__icon--make" icon={faEdit} />
          <FontAwesomeIcon className="tabBar__icon--rec" icon={faLightbulb} />
          <FontAwesomeIcon className="tabBar__icon--mypage" icon={faUser} />
        </div>
        {data ? (
          <div className="tabBar__button">
            <button className="tabBar__button--save">save</button>
            <button className="tabBar__button--load">load</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </TabBarWrap>
  );
};

export default TabBar;
