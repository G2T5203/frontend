import React from "react";
import "./style.css";

function Frame() {
  return (
    <div className="frame">
      <div className="div">
        <div className="text-wrapper">Sign in</div>
        <div className="frame-wrapper">
          <div className="div-2">
            <div className="div-2">
              <div className="input-field">
                <div className="div-3">
                  <div className="div-3">
                    <div className="label">Email address</div>
                    <div className="input">
                      <div className="content">
                        <div className="text">example@email.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <div className="div-3">
                  <div className="div-3">
                    <div className="label">Password</div>
                    <div className="input">
                      <div className="content">
                        <div className="text">Enter your password</div>
                      </div>
                      <img className="help-icon" alt="Help icon" src="help-icon.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-wrapper-2">Forgot password?</div>
          </div>
        </div>
      </div>
      <div className="button-wrapper">
        <button className="button">
          <div className="button-base">
            <div className="text-2">To the skies!</div>
          </div>
        </button>
      </div>
      <div className="div-4">
        <div className="don-t-have-an">Don&#39;t have an account?</div>
        <div className="text-wrapper-3">Sign up now</div>
      </div>
    </div>
  );
}
export default Frame;
