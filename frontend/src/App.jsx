import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip";
import * as auth from "./utils/auth";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [tooltipMessage, setTooltipMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setEmail(data.email);
          setToken(token);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  function handleRegister(email, password) {
    auth
      .register({ email, password })
      .then(() => {
        setIsSuccess(true);
        setTooltipMessage("¡Correcto! Ya estás registrado.");
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setTooltipMessage("Uy, algo salió mal. Por favor, inténtalo de nuevo.");
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    console.log("Intentando iniciar sesión:", email);

    auth
      .authorize({ email, password })
      .then((data) => {
        console.log("Respuesta:", data);

        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setToken(data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("ERROR LOGIN:", err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setToken("");
    setLoggedIn(false);
    setEmail("");
    navigate("/signin");
  }

  console.log("EMAIL ACTUAL:", email);

  if (isCheckingToken) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="page__content">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <>
                <Header email={email} onSignOut={handleSignOut} />
                <Main token={token} />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route path="/signin" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
        message={tooltipMessage}
      />
    </div>
  );
}

export default App;
