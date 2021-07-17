import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../helpers/auth";
import "./styles/resetPassword.css";

const ResetPassword = () => {
  const { resetPasswordLink } = useParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const disabledUntil = password === "";

  console.log(resetPasswordLink);

  const resetPasswordHandler = () => {
    resetPassword(password, resetPasswordLink).then((data) => {
      if (data.error) {
        setError(data.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        setMessage(data.message);
        setPassword("");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    });
  };
  return (
    <>
      <div className="reset-password-container">
        {error ? <h4 className="reset-password-error">{error}</h4> : null}
        {message ? <h4 className="reset-password-message">{message}</h4> : null}
        <div className="reset-password-content">
          <label className="reset-password-label">Enter New Password</label>
          <input
            type="email"
            className="password-input"
            value={password}
            onChange={passwordHandler}
          />
          <p className="reset-password-instruction">
            This Will Reset Your Old Password
          </p>
          <button
            className="reset-password-button"
            onClick={resetPasswordHandler}
            disabled={disabledUntil}
          >
            Reset Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
