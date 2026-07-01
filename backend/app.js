const { errors } = require('celebrate');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { validateSignup, validateSignin } = require('./middlewares/validation');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/aroundb');
app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);
app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no fue encontrado');
  error.statusCode = 404;
  next(error);
});

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
