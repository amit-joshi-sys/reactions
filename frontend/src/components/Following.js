import React from "react";
import { Link } from "react-router-dom";
import "./styles/following.css";

const Following = (props) => {
  let followingList = props.user.data.following;
  const fallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg";
  };
  return (
    <>
      <div className="following-container">
        <div className="following-content">
          {followingList.length > 0 ? (
            followingList.map((user) => (
              <div className="following-card" key={user._id}>
                <img
                  className="following-image"
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                  alt={user.name}
                  onError={fallbackImage}
                />
                <div className="user-content">
                  <div className="following-info">
                    <h4>Name:</h4>
                    <h4>{user.name}</h4>
                  </div>
                  <div className="profile-link-container">
                    <Link to={`/user/${user._id}`} className="profile-link">
                      Visit Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3 className="no-message">
              {props.user.data.name} Haven't Followed Anyone!
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Following;
