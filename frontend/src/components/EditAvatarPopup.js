import React, { useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onCloseEsc, onCloseOverlay, onUpdateAvatar, renderLoading }) {
  const ref = React.useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  useEffect(() => {
    ref.current.value = '';
  }, [isOpen]);

  return(
    <PopupWithForm
      name={"new-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseEsc = {onCloseEsc}
      onCloseOverlay = {onCloseOverlay}
      onSubmit = {handleSubmit}
      buttonText={"Сохранить"}
      buttonTextLoading={"Сохранение..."}
      renderLoading = {renderLoading}
    >
      <input
        className="popup__input popup__input_type_avatar"
        ref={ref}
        type="url"
        id="link-avatar"
        name="avatar"
        placeholder="Ссылка на новый аватар"
        required
      />
      <span className="popup__error link-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;