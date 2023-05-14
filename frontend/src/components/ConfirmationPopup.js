import React from 'react';
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup({ isOpen, onClose, onDeletePlace }) {

  function handleSubmit(event) {
    event.preventDefault();
    onDeletePlace();
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