export {
  popupEdit,
  popupAdd,
  popupEditForm,
  popupAddForm,
  nameInput,
  descriptionInput,
  editButton,
  addButton,
  addTitleInput,
  addLinkInput,
  cardsContainer,
  popupEditAvatar,
  popupEditAvatarForm,
  editAvatarButton,
  profileAvatar,
  profileTitle,
  profileSubtitle,
  popupRemoveCard,
  popupAvatarInput,
  initialCards,
  config,
};

const popupEdit = document.querySelector(".popup_place_edit");
const popupAdd = document.querySelector(".popup_place_add");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupRemoveCard = document.querySelector(".popup_type_delete-confirmation")

const popupEditForm = popupEdit.querySelector(".popup__form");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupEditAvatarForm = popupEditAvatar.querySelector(".popup__form");

const nameInput = popupEdit.querySelector(".popup__input-name");
const descriptionInput = popupEdit.querySelector(".popup__input-description");
const popupAvatarInput = popupEditAvatar.querySelector(".popup__input-avatar");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editAvatarButton = document.querySelector(".profile__edit-avatar-button")

const addTitleInput = popupAdd.querySelector(".popup__input-name");
const addLinkInput = popupAdd.querySelector(".popup__input-description");

const cardsContainer = document.querySelector(".elements");

const profileAvatar = popupEditAvatar.querySelector(".profile__avatar")
const profileTitle = document.querySelector(".profile__title")
const profileSubtitle = document.querySelector(".profile__subtitle")




const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};