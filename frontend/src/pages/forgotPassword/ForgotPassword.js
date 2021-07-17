import React, { useState } from "react";
import { forgotPassword } from "../../helpers/auth";
import "./styles/forgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const disabledUntil = email === "";

  const forgotPasswordHandler = () => {
    forgotPassword(email).then((data) => {
      if (data.error) {
        setError(data.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        console.log(data);
        setMessage(data.message);
        setEmail("");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    });
  };

  return (
    <>
      <div className="forgot-password-container">
        {error ? <h4 className="forgot-password-error">{error}</h4> : null}
        {message ? (
          <h4 className="forgot-password-message">{message}</h4>
        ) : null}
        <div className="forgot-password-content">
          <label className="forgot-password-label">Enter Your Email</label>
          <input
            type="email"
            className="email-input"
            value={email}
            onChange={emailHandler}
          />
          <p className="forgot-password-instruction">
            Enter Your Email Here To Get Further Instructions In Order To Reset
            Your Password
          </p>
          <button
            className="forgot-password-button"
            onClick={forgotPasswordHandler}
            disabled={disabledUntil}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
