import { useContext } from "react";

import React from 'react';

import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

import EditIcon from "../images/edit_icon.svg";
import AddIcon from "../images/add_icon.svg";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay profile__edit-avatar-button">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Профиль пользователя."
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__column">
            <h1 className="profile__title" name="name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              title="Редактировать"
              aria-label="Кнопка, позволяющая редактировать профиль пользователя"
              onClick={onEditProfile}
            >
              <img
                className="profile__edit-icon"
                src={EditIcon}
                alt="Кнопка, редактирующая профиль пользователя."
              />
            </button>
          </div>
          <p className="profile__subtitle" name="about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить"
          aria-label="Кнопка, которая добаляет элементы на страницу."
          onClick={onAddPlace}
        >
          <img
            className="profile__add-icon"
            src={AddIcon}
            alt="Кнопка, добавляющая элементы на страницу."
          />
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;