import React from "react";
import "./postStyles/createComment.css";

const CreateComment = (props) => {
  const showInput = () => {
    props.toggleShowInput();
  };

  return (
    <>
      <div className="create-comment-section">
        <button className="create-comment-button" onClick={showInput}>
          <i className="fal fa-comment-lines"></i>Comment
        </button>
      </div>
    </>
  );
};

export default CreateComment;
