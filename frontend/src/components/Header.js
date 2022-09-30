import logo from "../images/Mesto_logo.svg";
import React from "react";
import "../index.css";
import { Route, Link } from "react-router-dom";
import { Switch } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип." />
      <nav className="header__auth">
        <Switch>
          <Route exact path="/">
            <p className="header__paragraph">{email}</p>
            <button onClick={onSignOut} className="header__link">
              Выйти
            </button>
          </Route>
          <Route exact path="/signin">
            <Link to="/signup" className="header__link">
              Зарегистрироваться
            </Link>
          </Route>
          <Route exact path="/signup">
            <p className="header__paragraph">{email}</p>
            <Link to="/signin" className="header__link">
              Войти
            </Link>
          </Route>
        </Switch>
      </nav>
    </header>
  );
}

export default Header;
