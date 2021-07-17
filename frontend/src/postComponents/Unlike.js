import React from "react";
import { unlikePost } from "../postHelpers/post";
import "./postStyles/unlike.css";

const Unlike = (props) => {
  const { postId } = props;
  const likeHandler = () => {
    unlikePost(postId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        props.unlikePost();
      }
    });
  };
  return (
    <>
      <div className="unlike-section">
        <button className="unlike-button" onClick={likeHandler}>
          <i className="fal fa-thumbs-down fa-lg"></i>Unlike
        </button>
      </div>
    </>
  );
};

export default Unlike;
