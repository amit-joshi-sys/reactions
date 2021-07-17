import React from "react";
import "./styles/userInfo.css";

const UserInfo = (props) => {
  return (
    <>
      {props.user.data ? (
        <div className="main-container">
          <div className="user-info-container">
            {props.user.data.about ? (
              <div className="user-info">
                <h3>About:</h3>
                <h3>{props.user.data.about}</h3>
              </div>
            ) : null}

            <div className="user-info">
              <h3>Name:</h3>
              <h3>{props.user.data.name}</h3>
            </div>
            <div className="user-info">
              <h3>Email:</h3>
              <h3>{props.user.data.email}</h3>
            </div>
            <div className="user-info">
              <h3>User Since:</h3>
              <h3>{new Date(props.user.data.created).toDateString()}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserInfo;
