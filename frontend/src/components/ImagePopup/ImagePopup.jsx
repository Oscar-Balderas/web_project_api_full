export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card ? "popup_is-opened" : ""}`}>
      <div className="popup__content popup__content_content_image">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />

        {card && (
          <>
            <img className="popup__image" src={card.link} alt={card.name} />
            <p className="popup__caption">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}
