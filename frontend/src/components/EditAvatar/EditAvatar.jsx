import { useState } from "react";

export default function EditAvatar({ currentUser, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar });
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        className="popup__input"
        placeholder="Image link"
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
