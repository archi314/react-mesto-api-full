import React from "react";

const PopupWithForm = (props) => {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          title="Закрыть"
          aria-label="Кнопка, закрывающая модальное окно."
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          name={props.form}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="popup__button"
            title="Сохранить"
            aria-label="Кнопка, сохраняющая изменения в профиле."
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;