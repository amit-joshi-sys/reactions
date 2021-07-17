import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { isAuthenticated } from "../helpers/auth";
import { uncomment } from "../postHelpers/post";
import "./postStyles/commentList.css";

const CommentList = (props) => {
  const { comments, posterInfo, postId, changeCommentDeleted } = props;
  const [showActions, setShowActions] = useState(false);

  const toggleShowAction = () => {
    setShowActions((showActions) => !showActions);
  };

  const isPoster = () => {
    return posterInfo === isAuthenticated().user._id;
  };

  const isCommenter = (commenterId) => {
    return commenterId === isAuthenticated().user._id;
  };
  const deleteComment = (comment) => {
    uncomment(postId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        changeCommentDeleted();
        setShowActions(false);
      }
    });
  };
  const commentFallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg";
  };
  return (
    <>
      {comments ? (
        <div className="comment-list-container">
          <div className="comment-list-content">
            {comments.length > 0 ? (
              <div className="comment-list">
                {comments.map((singleComment) => (
                  <div className="comment-list-item" key={singleComment._id}>
                    <div className="commenter-info">
                      <Link to={`/user/${singleComment.commentedBy._id}`}>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/user/photo/${singleComment.commentedBy._id}`}
                          className="commenter-photo"
                          alt={singleComment.commentedBy.name}
                          onError={commentFallbackImage}
                        />
                      </Link>
                      <div className="commenter-name">
                        <h4>{singleComment.commentedBy.name}</h4>
                        <p>{new Date(singleComment.created).toDateString()}</p>
                      </div>
                      <div className="comment-actions">
                        <div className="action-dots">
                          {isPoster() ||
                          isCommenter(singleComment.commentedBy._id) ? (
                            <i
                              className="fal fa-ellipsis-h"
                              onClick={toggleShowAction}
                            ></i>
                          ) : null}
                        </div>
                        {showActions ? (
                          <div className="actions-window">
                            <div className="delete-action">
                              <button
                                className="delete-comment-button"
                                onClick={() =>
                                  deleteComment(singleComment.comment)
                                }
                              >
                                <i className="fas fa-trash-alt fa-lg"></i>
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="comment-text">{singleComment.comment}</div>
                  </div>
                ))}
              </div>
            ) : (
              <h3 className="no-comment-message">
                This Post Don't Have Any Comments!!
              </h3>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CommentList;
