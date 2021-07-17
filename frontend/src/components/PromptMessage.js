import React from "react";
import { useHistory } from "react-router-dom";
import { signOut } from "../helpers/auth";
import { deleteUser } from "../helpers/user";
import "./styles/promptMessage.css";

const PromptMessage = ({ children, showPrompt, setShowPrompt, userId }) => {
  const history = useHistory();

  const promptHandler = () => {
    setShowPrompt(false);
  };

  const deactivatePromptHandler = () => {
    deleteUser(userId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        signOut(() => console.log("user deleted"));
        history.push("/signup");
      }
    });
    setShowPrompt(false);
  };
  return (
    <>
      {showPrompt ? (
        <div className="prompt-container">
          <div className="prompt-message">
            {children}
            <div className="buttons">
              <button
                className="prompt-button"
                onClick={deactivatePromptHandler}
              >
                Deactivate!
              </button>
              <button className="prompt-button" onClick={promptHandler}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PromptMessage;
