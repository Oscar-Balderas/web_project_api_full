import { useState } from "react";

export default function EditProfile({ currentUser, onUpdateUser }) {
  const [name, setName] = useState(currentUser.name || "");
  const [about, setAbout] = useState(currentUser.about || "");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input"
        placeholder="Nombre"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="popup__input"
        placeholder="Descripción"
        type="text"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        required
      />
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
