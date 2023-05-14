import React from 'react';
import pencil from '../images/icon_pencil.svg';
import plus from '../images/icon_plus.svg';
import Card from '../components/Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__ava">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <button className="profile__avatar-button" onClick={onEditAvatar} type="button" />
        </div>
        <div className="profile__content">
          <div className="profile__user">
            <h1 className="profile__info profile__info_type_name">{currentUser.name}</h1>
            <p className="profile__info profile__info_type_about-me">{currentUser.about}</p>
          </div>
          <button className="profile__edit" onClick={onEditProfile} type="button">
            <img className="profile__icon-pencil" src={pencil} alt="Редактировать" />
          </button>
        </div>
        <button className="profile__add" onClick={onAddPlace} type="button">
          <img className="profile__icon-plus" src={plus} alt="Добавить" />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />)
            )}
        </ul>
      </section>
    </main>
  );
}

export default Main;