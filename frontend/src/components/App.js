import "../index.css";
import React from "react";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import api from "../utils/Api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [infoToolTipOpened, setInfoToolTipOpened] = useState(false);
  const [infoToolTipStatus, setInfoToolTipStatus] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [userLoginData, setUserLoginData] = useState("");

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, card]) => {
          setCurrentUser(userData);
          setCards(card);
        })
        .catch((err) => {
          console.log(err);
        });
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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoToolTipOpened(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addUserCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const history = useHistory();

  const handleTokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    auth
      .getData(token)
      .then((res) => {
        if (res) {
          setAuthEmail(res.data.email);
          setLoggedIn(true);
        } else {
          localStorage.removeItem("jwt");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  /** Регистрация нового пользователя */

  const handleRegister = (data) => {
    const { email, password } = data;
    return auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipStatus(true);
          setInfoToolTipOpened(true);
          history.push("/signin");
        } else {
          setInfoToolTipStatus(true);
        }
      })
      .catch((err) => {
        setInfoToolTipStatus(false);
        setInfoToolTipOpened(true);
        console.log(`Произошла ошибка: ${err}`);
        history.push("/signup");
      });
  };

  /** Авторизация пользователя */

  const handleLogin = (data) => {
    const { email, password } = data;
    setUserLoginData(email);
    return auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setAuthEmail(data.email);
          history.push("/");
        } else {
          setInfoToolTipStatus(true);
          setInfoToolTipOpened(true);
        }
      })
      .catch((err) => {
        setInfoToolTipStatus(false);
        setInfoToolTipOpened(true);
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  const signOut = () => {
    setLoggedIn(false);
    setAuthEmail(null);
    localStorage.removeItem("jwt");
    history.push("/signin");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          title="войти"
          email={authEmail}
          handleLogin={handleLogin}
          onSignOut={signOut}
        />
        <Switch>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/">
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              userLoginData={userLoginData}
              loggedIn={loggedIn}
              onSignOut={signOut}
            />
          </Route>
          <Route exact path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="delete-confirmation"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoToolTip
          isOpen={infoToolTipOpened}
          onClose={closeAllPopups}
          auth={infoToolTipStatus}
          authSuccess="Вы успешно зарегистрировались!"
          authFail="Что-то пошло не так! Попробуйте еще раз."
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
