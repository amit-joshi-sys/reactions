import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SearchedUserList from "../../components/SearchedUserList";
import SearchUser from "../../components/SearchUser";
import { isAuthenticated, signOut } from "../../helpers/auth";
import { searchUser } from "../../helpers/user";
import "./styles/menu.css";

const Menu = ({ history }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedUserList, setSearchedUserList] = useState([]);
  const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#90a4ae" };
  };

  const searchUserText = (searchKeyword) => {
    setSearchText(searchKeyword);
  };

  const signOutHandler = () => {
    signOut(() => {
      history.push("/signin");
    });
  };

  useEffect(() => {
    const name = searchText;
    if (name.length > 0) {
      searchUser(name).then((data) => {
        if (data.error) {
          console.log(data.error);
        }
        if (data === "User not found") {
          setSearchedUserList([]);
        } else {
          setSearchedUserList(data);
        }
      });
    }
    if (name === "") {
      setSearchedUserList([]);
    }
  }, [searchText]);

  const fallbackImage = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://icon2.cleanpng.com/20180920/cpy/kisspng-computer-icons-portable-network-graphics-avatar-ic-5ba3c66dae9957.9805960115374598217152.jpg";
  };

  return (
    <>
      <ul className="menu-bar">
        <div className="left">
          <Link className="title" to="/">
            Reactions
          </Link>
          {isAuthenticated() ? (
            <SearchUser
              searchText={searchText}
              searchUserText={searchUserText}
            />
          ) : null}
          <SearchedUserList
            searchedUserList={searchedUserList}
            searchUserText={searchUserText}
          />
        </div>
        <div className="right">
          {isAuthenticated() ? (
            <div className="background">
              <Link
                className="user-photo"
                to={`/user/${isAuthenticated().user._id}`}
              >
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${
                    isAuthenticated().user._id
                  }`}
                  className="menu-user-photo"
                  alt={isAuthenticated().user.name}
                  onError={fallbackImage}
                />
              </Link>
            </div>
          ) : null}

          {!isAuthenticated() && (
            <>
              <Link
                className="menu-item"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                Sign In
              </Link>
              <Link
                className="menu-item"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated() && (
            <button className="signout-btn" onClick={signOutHandler}>
              Sign Out
            </button>
          )}
        </div>
      </ul>
    </>
  );
};

export default withRouter(Menu);
