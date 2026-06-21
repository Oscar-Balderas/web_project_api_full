import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
      <Header linkText="Iniciar sesión" linkPath="/signin" />

      <main className="auth">
        <h2 className="auth__title">Regístrate</h2>

        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />

          <input
            className="auth__input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            required
          />

          <button className="auth__button" type="submit">
            Registrarse
          </button>
        </form>

        <Link className="auth__link" to="/signin">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </main>
    </>
  );
}

export default Register;
