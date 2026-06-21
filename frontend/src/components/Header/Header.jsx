import { useState } from "react";
import logo from "../../images/logo.svg";
import menuIcon from "../../images/menu.svg";
import closeIcon from "../../images/close.svg";
import { Link } from "react-router-dom";

function Header({ linkText, linkPath, email, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {isMenuOpen && (
        <div className="header__mobile-menu">
          <p className="header__mobile-email">{email}</p>

          <button className="header__mobile-logout" onClick={onSignOut}>
            Cerrar sesión
          </button>
        </div>
      )}

      <header className="header page__section">
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />

        {email && (
          <>
            <p className="header__email">{email}</p>

            <button className="header__logout" onClick={onSignOut}>
              Cerrar sesión
            </button>

            <button className="header__menu-button" onClick={handleMenuToggle}>
              <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menú" />
            </button>
          </>
        )}

        {linkText && (
          <Link className="header__link" to={linkPath}>
            {linkText}
          </Link>
        )}
      </header>
    </>
  );
}

export default Header;
