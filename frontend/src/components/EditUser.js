import React, { useState } from "react";
import { updateUser } from "../helpers/user";
import PromptMessage from "./PromptMessage";
import "./styles/editUser.css";
import Loader from "./Loader";
import { isAuthenticated, updateUserInLocalStorage } from "../helpers/auth";

const EditUser = (props) => {
  const [values, setValues] = useState({
    name: props.user.data.name,
    email: props.user.data.email,
    about: "",
    formdata: new FormData(),
  });
  const { name, email, about, formdata } = values;
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = isAuthenticated().user._id;
  const promptHandler = () => {
    setShowPrompt(true);
  };

  const disabledUntil =
    name === "" ||
    email === "" ||
    (name === props.user.data.name &&
      email === props.user.data.email &&
      formdata === "");

  const isValid = () => {
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      setError("Email is not well formatted");
      setTimeout(() => {
        setError("");
      }, 1000);
      return false;
    } else {
      return true;
    }
  };

  const updateHandler = () => {
    if (isValid()) {
      setLoading(true);
      updateUser(formdata, userId).then((data) => {
        if (data && data.error) {
          setError(data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
        } else {
          const user = data;
          updateUserInLocalStorage(user);
          setValues({ formdata: new FormData() });
          props.update(true);
          props.updatePhoto(true);
          setSuccess("Profile Updated Successfully!");
          setLoading(false);
          setError("");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        }
      });
    }
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formdata.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleFiles = (name) => (event) => {
    const value = event.target.files[0];
    console.log(value);
    formdata.set(name, value);
  };

  return (
    <>
      {props.user.data ? (
        <div className="main-container">
          {error ? <h4 className="update-error">{error}</h4> : null}
          {success ? <h4 className="update-success">{success}</h4> : null}
          {loading ? <Loader /> : null}
          <PromptMessage
            showPrompt={showPrompt}
            setShowPrompt={setShowPrompt}
            userId={props.user.data._id}
          >
            This will Permanently Delete Your Account!
          </PromptMessage>

          <div className="user-edit-container">
            <div className="user-edit">
              <h3>About:</h3>
              <textarea
                type="text"
                value={about}
                onChange={handleChange("about")}
                className="user-input"
              />
            </div>
            <div className="user-edit">
              <h3>Name:</h3>
              <input
                type="text"
                value={name}
                onChange={handleChange("name")}
                className="user-input"
              />
            </div>
            <div className="user-edit">
              <h3>Profile Photo:</h3>
              <input
                type="file"
                accept="images/*"
                onChange={handleFiles("profilePhoto")}
                className="user-input"
              />
            </div>
            <div className="user-edit">
              <h3>Timeline Photo:</h3>
              <input
                type="file"
                accept="images/*"
                onChange={handleFiles("timelinePhoto")}
                className="user-input"
              />
            </div>
            <div className="user-edit-info">
              <h3>Email:</h3>
              <input
                type="email"
                value={email}
                onChange={handleChange("email")}
                className="user-input"
              />
            </div>
            <div className="edit-buttons">
              <button
                className="update-info"
                onClick={updateHandler}
                disabled={disabledUntil}
              >
                Update Info
              </button>
              <button className="deactivate" onClick={promptHandler}>
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default EditUser;
