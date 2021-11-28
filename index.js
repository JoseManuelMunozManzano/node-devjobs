const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const router = require('./routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config({ path: 'variables.env' });

const app = express();

// Habilitar handlebars como view
// Para que funcione, se debe crear una carpeta llamada views y dentro otra llamada layouts
// Como hemos indicado que el defaultLayout se llamará layout, dentro de la carpeta layouts habrá
// que crear el archivo layout.hbs porque hemos dicho que el extension name es hbs. Sino se pone eso
// se deberá llamar layout.handlebars
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'layout',
    // Los helpers es una forma de registrar scripts para que se comuniquen directamente con handlebars antes de su salida
    helpers: require('./helpers/handlebars'),
  })
);
app.set('view engine', 'hbs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Creamos una sesión para almacenar la conexión de Mongo y no tener que estar autenticándonos todo el tiempo
app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  })
);

app.use('/', router());

app.listen(process.env.PUERTO);
