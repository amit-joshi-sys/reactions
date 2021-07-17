import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../helpers/auth";
import "./styles/signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signUpHandler = (event) => {
    event.preventDefault();
    const user = { name, email, password };
    signUp(user)
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setTimeout(() => {
            setError("");
          }, 2000);
          setName("");
          setEmail("");
          setPassword("");
        } else {
          setName("");
          setEmail("");
          setPassword("");
          setError("");
          setSuccess(data.message);
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  const disabledUntil = name === "" || email === "" || password === "";
  return (
    <>
      <div className="signup-container">
        <div className="signup-content">
          <h3>Welcome To Reactions!!</h3>
          <form className="signup-form" action="">
            {error ? <h4 className="error">{error}</h4> : null}
            {success ? <h4 className="success">{success}</h4> : null}
            <div className="signup-form-container">
              <label className="signup-input-label">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="signup-form-container">
              <label className="signup-input-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-form-container">
              <label id="password" className="signup-input-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="signup-btn"
              onClick={signUpHandler}
              disabled={disabledUntil}
            >
              Create New Account
            </button>
            <Link className="signup-link" to="/signin">
              Already a User Signin Here
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
