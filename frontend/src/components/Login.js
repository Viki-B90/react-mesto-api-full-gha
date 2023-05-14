import React from 'react';
import { useState } from 'react';

function Login({ onLogin }) {
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

    onLogin(email, password);
  };

  return (
    <section className="auth">
      <h3 className="auth__title">Вход</h3>
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
        <button className="auth__reg-button">Войти</button>
      </form>
    </section>
  );
};

export default Login;