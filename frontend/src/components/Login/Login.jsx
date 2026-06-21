import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  return (
    <>
      <Header linkText="Regístrate" linkPath="/signup" />
      <main className="auth">
        <h2 className="auth__title">Iniciar sesión</h2>

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
            Inicia sesión
          </button>
          <Link className="auth__link" to="/signup">
            ¿Aún no eres miembro? Regístrate aquí
          </Link>
        </form>
      </main>
    </>
  );
}

export default Login;
