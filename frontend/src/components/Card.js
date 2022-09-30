import React from "react";

import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const isOwn = props.card.owner._id === currentUser._id;

  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  const cardLikeButtonClassName = `element__heart-icon ${
    isLiked ? "element__heart-icon_active" : ""
  }`;

  function handleRemoveCard() {
    props.onCardDelete(props.card);
  }

  const cardDeleteButtonClassName = `element__busket-icon ${
    isOwn ? "element__busket-icon_visible" : "element__busket-icon_hidden"
  }`;

  return (
    <div className="template-elements">
      <article className="element">
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleRemoveCard}
        ></button>
        <img
          className="element__image"
          src={props.card.link}
          alt={props.card.name}
          onClick={handleCardClick}
        />
        <div className="element__column">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__heart-container">
            <button
              className={cardLikeButtonClassName}
              type="button"
              title="Мне нравится"
              aria-label="Кнопка Мне нравится."
              onClick={handleCardLike}
            ></button>
            <span className="element__heart-counter">
              {props.card.likes.length}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
