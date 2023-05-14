import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/api';
import { register, authorize, tokenCheck } from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';
import reportSuccess from '../images/success.svg'
import reportError from '../images/error.svg'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [renderLoading, setRenderLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [status, setStatus] = useState({ image:'', text:'' });
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigate = useNavigate();

  function handleLogin(email, password) {
    authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch(() => {
        setStatus({
          image: reportError,
          text: 'Что-то пошло не так! Попробуйте еще раз.'
        });
        handleInfoTooltip();
      });
  };

  function handleRegister(email, password) {
    register(email, password)
      .then(() => {
        setStatus({
          image: reportSuccess,
          text: 'Вы успешно зарегистрировались!'
        });
        navigate("/signin");
      })
      .catch(() => {
        setStatus({
          image: reportError,
          text: 'Что-то пошло не так! Попробуйте еще раз.'
        });
      })
      .finally(handleInfoTooltip);
  };

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail(null);
    navigate("/signin");
  };

  function handleInfoTooltip() {
    setInfoTooltip(true);
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      tokenCheck(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserProfile(), api.getInitialCards()])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        })
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(dataCard) {
    setSelectedCard(dataCard);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleOverlayClose(event) {
     if (event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.setLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
      } else {
      api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
      }
  }

  function handleUpdateUser(data) {
    setRenderLoading(true);
    api.setUserProfile(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false)
      });
  }

  function handleUpdateAvatar(data) {
    setRenderLoading(true);
    api.changeUserAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false)
      });
  }

  function handleAddPlaceSubmit(data) {
    setRenderLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false)
      });
  }

  function handleConfirmClick(card) {
    setConfirmationPopupOpen(true);
    setCardDelete(card)
  }

  function handleCardDelete() {
    api.deleteCard(cardDelete._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== cardDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      }); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route exact path='/'
            element={
              <>
                <Header titleOut='Выйти' route='' email={email} onClick={handleSignout} />
                <ProtectedRoute
                  component={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike = {handleCardLike}
                  onCardDelete={handleConfirmClick}
                  cards={cards}
                />
              </>
            }
          />
          <Route path='/signup'
            element={
              <>
                <Header title='Войти' route='/signin' />
                <Register onRegister={handleRegister} />
              </>
            }
          />
          <Route path='/signin'
            element={
              <>
                <Header title='Регистрация' route='/signup' />
                <Login onLogin={handleLogin} />
              </>
            }
          />
          <Route exact path='/'
            element={
              loggedIn ? <Navigate to='/' /> : <Navigate to='/signin'/>
            }
          />
        </Routes>
        <Footer />
        <InfoTooltip
          status={status}
          isOpen={infoTooltip}
          onClose = {closeAllPopups}
        />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}  
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
          onUpdateUser={handleUpdateUser} 
          renderLoading={renderLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
          onUpdateAvatar = {handleUpdateAvatar} 
          renderLoading={renderLoading}
        />
        <AddPlacePopup
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
          onAddPlace = {handleAddPlaceSubmit}
          renderLoading = {renderLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={imagePopupOpen}
          onClose={closeAllPopups}
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
        />
        <ConfirmationPopup 
          isOpen={isConfirmationPopupOpen} 
          onClose={closeAllPopups} 
          onDeletePlace={handleCardDelete} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;