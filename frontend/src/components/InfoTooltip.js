import React from 'react';

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <section className={`popup popup_tooltip ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button" />
        <img className="popup__icon-notify" src={status.image} alt={status.text} />
        <h2 className="popup__title-notify">{status.text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;