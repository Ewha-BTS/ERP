import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { loadGeneratedData, postSampleData } from "../../lib/api";
import { recommendState } from "../../lib/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

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
        cursor: pointer;
      }
    }

    &__button {
      margin-left: 10px;
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      &--save {
        margin: 0.5rem;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        border: none;
        background-color: rgb(91.8%, 92.4%, 93.7%);
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
      }

      &--load {
        label {
          margin: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 3px;
          border: none;
          background-color: rgb(91.8%, 92.4%, 93.7%);
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
        }

        input[type="file"] {
          position: absolute;
          display: none;
        }
      }
    }
  }
`;

const TabBar = ({ data, history }) => {
  data = true;

  const [loadData, setLoadData] = useRecoilState(recommendState);

  const handleChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    const data = await postSampleData(formData);
    const generatedData = await loadGeneratedData(data.data);
    await setLoadData(generatedData.data.vizspec);
  };

  useEffect(() => {
    console.log(loadData);
  }, [loadData]);

  return (
    <TabBarWrap>
      <div className="tabBar">
        <div className="tabBar__icon">
          <FontAwesomeIcon
            className="tabBar__icon--board"
            icon={faColumns}
            onClick={() => history.push("/")}
          />

          <FontAwesomeIcon
            className="tabBar__icon--make"
            icon={faEdit}
            onClick={() => history.push("/make")}
          />

          <FontAwesomeIcon
            className="tabBar__icon--rec"
            icon={faLightbulb}
            onClick={() => history.push("/recommend")}
          />

          <FontAwesomeIcon
            className="tabBar__icon--mypage"
            icon={faUser}
            onClick={() => history.push("/mypage")}
          />
        </div>
        <div className="tabBar__button">
          {data ? (
            <button className="tabBar__button--save">save</button>
          ) : (
            <></>
          )}
          <form className="tabBar__button--load">
            <label>
              load
              <input type="file" name="file" onChange={handleChange} />
            </label>
          </form>
        </div>
      </div>
    </TabBarWrap>
  );
};

export default withRouter(TabBar);
