import successIcon from "../../images/success-icon.svg";
import errorIcon from "../../images/error-icon.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`popup ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__content popup__content_type_tooltip">
        <button className="popup__close" type="button" onClick={onClose} />

        <img
          className="popup__tooltip-icon"
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Éxito" : "Error"}
        />

        <p className="popup__tooltip-text">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
