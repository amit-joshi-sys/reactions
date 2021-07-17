import React from "react";
import { follow } from "../helpers/user";
import "./styles/followButton.css";

const FollowButton = (props) => {
  const followHandler = () => {
    props.followUser(follow);
    props.setFollowUser();
  };
  return (
    <>
      <button className="follow-button" onClick={followHandler}>
        Follow
      </button>
    </>
  );
};

export default FollowButton;
