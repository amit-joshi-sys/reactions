import React from "react";
import { likePost } from "../postHelpers/post";
import "./postStyles/like.css";

const Like = (props) => {
  const { postId } = props;
  const likeHandler = () => {
    likePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        props.likePost();
      }
    });
  };
  return (
    <>
      <div className="like-section">
        <button className="like-button" onClick={likeHandler}>
          <i className="fal fa-thumbs-up fa-lg"></i>Like
        </button>
      </div>
    </>
  );
};

export default Like;
