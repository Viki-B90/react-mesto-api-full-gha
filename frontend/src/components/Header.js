import React from 'react';
import logo from '../images/mesto_logo.svg';
import { Link } from 'react-router-dom';

function Header({ title, titleOut, email, route, onClick }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className='header__auth'>
        <p className='header__login'>{email}</p>
        <button className='header__logout-link' onClick={onClick}>{titleOut}</button>
        <Link to={route} className='header__link' onClick={onClick}>{title}</Link>
      </div>
    </header>
  );
}

export default Header;