import { useState } from "react";
import Popup from "./componentes/Popup/Popup";
import NewCard from "./form/NewCard/NewCard";
import avatar from "../../images/avatar.jpg";
import Card from "../Card/Card";
import ImagePopup from "../ImagePopup/ImagePopup";
import RemoveCard from "../RemoveCard/RemoveCard";

const cards = [
  {
    isLiked: false,
    _id: "1",
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    isLiked: false,
    _id: "2",
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
];

function Main() {
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard />,
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

  const removeCardPopup = {
    title: "Eliminar Card",
    children: <RemoveCard />,
  };

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
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
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">Jacques Cousteau</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => handleOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">Explorador</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={setSelectedCard} />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title} isOpen={!!popup}>
          {popup.children}
        </Popup>
      )}

      <ImagePopup
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      ></ImagePopup>
    </main>
  );
}

export default Main;
