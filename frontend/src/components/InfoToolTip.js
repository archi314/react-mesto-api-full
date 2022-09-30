import React from "react";
import loginSuccess from "../images/success-sign-in.svg";
import loginFailed from "../images/fail-sign-in.svg";

function InfoTooltip(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__registration">
        <button type="button" className="popup__close" onClick={props.onClose} />
        <img
          className="popup__img-reg"
          src={props.auth ? `${loginSuccess}` : `${loginFailed}`}
          alt="Изображение статуса регистрации"
        />
        <p className="popup__reg-status">
          {`${
            props.auth
              ? props.authSuccess
              : props.authFail
          }`}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;