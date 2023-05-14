import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onCloseEsc, onCloseOverlay, onUpdateUser, renderLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return(
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
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
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Имя"
        value={name}
        onChange={handleNameChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error name-input-error" />
      <input
        className="popup__input popup__input_type_info"
        type="text"
        id="info-input"
        name="about"
        placeholder="О себе"
        value={description}
        onChange={handleDescriptionChange}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error info-input-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;