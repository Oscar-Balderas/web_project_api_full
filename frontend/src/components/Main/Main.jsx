import { useEffect, useState } from "react";
import Popup from "./componentes/Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import avatar from "../../images/avatar.jpg";
import Card from "../Card/Card";
import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../RemoveCard/RemoveCard";

function Main({ token }) {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch("https://api-project19-oscar.chickenkiller.com/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCardLike(card) {
    const method = card.likes && card.likes.length > 0 ? "DELETE" : "PUT";

    fetch(
      `https://api-project19-oscar.chickenkiller.com/cards/${card._id}/likes`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }

        return res.json();
      })
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    fetch(`https://api-project19-oscar.chickenkiller.com/cards/${card._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }

        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((err) => console.log(err));
  }

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlaceSubmit={handleAddPlaceSubmit} />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <form className="popup__form">
        <input className="popup__input" placeholder="Nombre" type="text" />
        <input className="popup__input" placeholder="Descripción" type="text" />
        <button className="button popup__button" type="submit">
          Guardar
        </button>
      </form>
    ),
  };

  const editAvatarPopup = {
    title: "Cambiar avatar",
    children: (
      <form className="popup__form">
        <input className="popup__input" placeholder="Image link" type="url" />
        <button className="button popup__button" type="submit">
          Guardar
        </button>
      </form>
    ),
  };

  function handleAddPlaceSubmit({ name, link }) {
    fetch("https://api-project19-oscar.chickenkiller.com/cards", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }

        return res.json();
      })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img className="profile__image" src={avatar} alt="Avatar" />
          <button
            className="profile__avatar-edit-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          />
          <p className="profile__description">Explorador</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title} isOpen={!!popup}>
          {popup.children}
        </Popup>
      )}

      <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />
    </main>
  );
}

export default Main;
