import React from 'react';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onCloseEsc, onCloseOverlay, onAddPlace, renderLoading }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setLink('');
    }
  }, [isOpen])

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleLinkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseEsc = {onCloseEsc}
      onCloseOverlay = {onCloseOverlay}
      onSubmit = {handleSubmit}
      buttonText={"Создать"}
      buttonTextLoading={"Сохранение..."}
      renderLoading = {renderLoading}
    >
      <input
        className="popup__input popup__input_type_title"
        type="text"
        id="title-input"
        name="name"
        value={title}
        onChange={handleTitleChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error title-input-error" />
      <input
        className="popup__input popup__input_type_link"
        type="url"
        id="url-input"
        name="link"
        value={link}
        onChange={handleLinkChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error url-input-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;