import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      buttonText="Сохранить"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="edit-avatar"
        className="popup__input popup__input-avatar"
        id="edit-avatar"
        placeholder="Ссылка на картинку"
        type="url"
        required
        ref={avatarRef}
      />
      <span className="popup__error edit-avatar-error" id="edit-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
