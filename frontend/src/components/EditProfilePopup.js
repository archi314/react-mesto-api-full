import React from "react";

import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleProfileName(evt) {
    setName(evt.target.value);
  }

  function handleProfileDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="profile-name"
        className="popup__input popup__input-name"
        id="input_name"
        placeholder="Имя"
        type="text"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleProfileName}
      />

      <span className="popup__error title-error" id="title-error" />

      <input
        name="profile-about"
        className="popup__input popup__input_status popup__input-description"
        id="input_about"
        placeholder="Профессия"
        type="text"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleProfileDescription}
      />

      <span className="popup__error status-error" id="status-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
