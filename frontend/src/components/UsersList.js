import React from "react";
import { Link } from "react-router-dom";
import "./styles/usersList.css";

const UsersList = (props) => {
  const fallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg";
  };

  return (
    <>
      <div className="users-container">
        <div className="users-content">
          <div className="heading">
            <h3>People You May Know</h3>
          </div>
          <div className="users-card-container">
            {props.users
              ? props.users.map((user) => (
                  <div className="users-card" key={user._id}>
                    <div className="user-image">
                      <img
                        className="user-image"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        alt={user.name}
                        onError={fallbackImage}
                      />
                    </div>
                    <h4 className="user-name">
                      {user.name[0].toUpperCase()}
                      {user.name.slice(1)}
                    </h4>
                    <Link className="add-friend" to={`/user/${user._id}`}>
                      Visit Profile
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersList;
