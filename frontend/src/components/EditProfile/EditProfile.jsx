export default function EditProfile() {
  return (
    <form className="popup__form">
      <input className="popup__input" placeholder="Nombre" type="text" />
      <input className="popup__input" placeholder="Descripción" type="text" />
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
