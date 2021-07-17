import React from "react";
import "./styles/searchUser.css";

const SearchUser = (props) => {
  const { searchText, searchUserText } = props;

  const searchHadler = (e) => {
    searchUserText(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={searchText}
        className="search-input"
        placeholder="Search User"
        onChange={searchHadler}
      />
    </>
  );
};

export default SearchUser;
