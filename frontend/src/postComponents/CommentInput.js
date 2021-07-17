import React from "react";
import { createComment } from "../postHelpers/post";
import "./postStyles/commentInput.css";

const CommentInput = (props) => {
  const { commentText, changeComment, postId, toggleShowInput } = props;

  const handleComment = (e) => {
    changeComment(e.target.value);
  };

  const commentHandler = () => {
    const comment = { comment: commentText };
    createComment(postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        changeComment("");
        toggleShowInput();
      }
    });
  };

  const disabledUntil = commentText === "";
  return (
    <>
      <div className="comment-input-container">
        <div className="comment-input">
          <input
            type="text"
            className="comment-input-field"
            placeholder="Add Your Comment"
            value={commentText}
            onChange={handleComment}
          />
          <button
            disabled={disabledUntil}
            className="post-comment-button"
            onClick={commentHandler}
          >
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentInput;
