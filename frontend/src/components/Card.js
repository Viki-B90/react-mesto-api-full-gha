import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img className="element__image" src={card.link} onClick={handleCardClick} alt={card.name} />
      {isOwn && <button className='element__delete' onClick={handleDeleteClick} type="button" />}
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__for-like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
          <p className="element__counter-like">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;