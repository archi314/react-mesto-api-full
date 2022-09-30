import React from 'react';

const ImagePopup = (props) => {
 return (
  <div className={`popup popup_place_image ${props.card ?  "popup_opened" : ""}`}> 
    <figure className="popup__container popup__container_image">
      <button className="popup__close" type="button" title="Закрыть" aria-label="Кнопка, закрывающая модальное окно." onClick={props.onClose} />
      <img className="popup__card-image" src= {props.card ? props.card.link: ''} alt={props.card ? props.card.name : ''}/>
      <figcaption className="popup__card-text">{props.card ? props.card.name : ''}</figcaption>
    </figure>
  </div>
  );
 }

 export default ImagePopup;