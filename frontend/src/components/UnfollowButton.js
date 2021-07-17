import React from "react";
import { unfollow } from "../helpers/user";
import "./styles/unfollowButton.css";

const UnfollowButton = (props) => {
  const unfollowHandler = () => {
    props.followUser(unfollow);
    props.setFollowUser();
  };
  return (
    <>
      <button className="unfollow-button" onClick={unfollowHandler}>
        Unfollow
      </button>
    </>
  );
};

export default UnfollowButton;
