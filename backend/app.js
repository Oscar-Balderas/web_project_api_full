const express = require("express");
const mongoose = require("mongoose");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
app.use(express.json());
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/aroundb");
app.post("/signin", login);
app.post("/signup", createUser);
app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no fue encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
