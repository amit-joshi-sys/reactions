import React from "react";
import { Link } from "react-router-dom";
import "./styles/followers.css";

const Followers = (props) => {
  let followersList = props.user.data.followers;
  const fallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg";
  };
  return (
    <>
      <div className="follower-container">
        <div className="follower-content">
          {followersList.length > 0 ? (
            followersList.map((user) => (
              <div className="follower-card" key={user._id}>
                <img
                  className="follower-image"
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                  alt={user.name}
                  onError={fallbackImage}
                />
                <div className="user-content">
                  <div className="follower-info">
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
              {props.user.data.name} Has No Followers!
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Followers;
