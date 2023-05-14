import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onRegister(email, password);
  };

  return (
    <section className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
          required
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePassword}
          required
        />
        <button className="auth__reg-button">Зарегистрироваться</button>
      </form>
      <div className="auth__question">
        <p className="auth__text">Уже зарегистрированы?</p>
        <Link to="/signin" className="auth__link">Войти</Link>
      </div>
    </section>
  );
};

export default Register;