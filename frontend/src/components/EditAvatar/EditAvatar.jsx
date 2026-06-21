export default function EditAvatar() {
  return (
    <form className="popup__form">
      <input className="popup__input" placeholder="Image link" type="url" />
      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
