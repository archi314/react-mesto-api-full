import React from "react";

import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleTitleChange(e) {
    setCardTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardTitle,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardTitle("");
    setCardLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="place-name"
        className="popup__input popup__input-name"
        id="name"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        required
        onChange={handleTitleChange}
        value={cardTitle ? cardTitle : ""}
      />

      <span className="popup__error name-error" id="name-error" />

      <input
        name="place-link"
        className="popup__input popup__input_status popup__input-description"
        id="link"
        placeholder="Ссылка на картинку"
        type="url"
        required
        onChange={handleLinkChange}
        value={cardLink ? cardLink : ""}
      />

      <span className="popup__error link-error" id="link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;