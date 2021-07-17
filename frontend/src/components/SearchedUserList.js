import React from "react";
import { Link } from "react-router-dom";
import "./styles/searchUserList.css";

const SearchedUserList = (props) => {
  const { searchedUserList, searchUserText } = props;

  const searchFallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://icon2.cleanpng.com/20180920/cpy/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66dae9957.9805960115374598217152.jpg";
  };

  const searchReset = () => {
    searchUserText("");
  };
  return (
    <>
      {searchedUserList && searchedUserList.length > 0 ? (
        <div className="searched-user-container">
          <div className="searched-user-list">
            {searchedUserList.map((user) => (
              <div key={user._id} className="user-list-item">
                <Link to={`/user/${user._id}`} onClick={searchReset}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                    className="searched-user-photo"
                    alt={user.name}
                    onError={searchFallbackImage}
                  />
                </Link>
                <div className="searched-user-name">{user.name}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SearchedUserList;
