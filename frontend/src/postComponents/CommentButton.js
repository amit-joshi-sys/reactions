import React from "react";
import { Link } from "react-router-dom";
import "./postStyles/commentButton.css";

const Comments = (props) => {
  const { postId } = props;
  return (
    <>
      <div className="comment-section">
        <Link className="comment-button" to={`/post/${postId}`}>
          <i className="fal fa-comment-lines"></i>Comments
        </Link>
      </div>
    </>
  );
};

export default Comments;
