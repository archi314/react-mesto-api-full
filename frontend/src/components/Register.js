import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [regData, setRegData] = useState({ email: "", password: "" });

  function handleOnChange(evt) {
    const { name, value } = evt.target;
    setRegData({ ...regData, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(regData);
  }

  return (
    <div className="authorization">
      <form onSubmit={handleSubmit} className="authorization__wrapper">
        <h3 className="authorization__title">Регистрация</h3>
        <input
          type="email"
          required
          minLength="2"
          maxLength="20"
          name="email"
          className="authorization__input-field"
          value={regData.email}
          onChange={handleOnChange}
          placeholder="Email"
        />
        <input
          type="password"
          required
          minLength="2"
          maxLength="200"
          name="password"
          className="authorization__input-field"
          value={regData.password}
          onChange={handleOnChange}
          placeholder="Password"
        />
        <button className="authorization__button" type="submit">
          Зарегистрироваться
        </button>
        <Link to="/signin" className="authorization__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;