import React from 'react';
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup({ isOpen, onClose, cardDelete, onDeletePlace }) {

  function handleSubmit(event) {
    event.preventDefault();
    onDeletePlace(cardDelete);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={"delete"}
      title={"Вы уверены?"}
      buttonText={"Да"}
    />
  )
}

export default ConfirmationPopup;