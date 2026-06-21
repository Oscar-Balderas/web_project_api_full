export default function Popup({ onClose, title, children, isOpen }) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__content">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        {children}
      </div>
    </div>
  );
}
