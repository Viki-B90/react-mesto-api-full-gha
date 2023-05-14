import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_img ${card.link ? 'popup_opened' : ''}`} >
      <div className="popup__container-image">
        <button className="popup__close" onClick={onClose} type="button" />
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__title-image">{card.name}</h3>
      </div>
    </section>
  );
}

export default ImagePopup;