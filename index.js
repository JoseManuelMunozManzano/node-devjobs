const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const router = require('./routes');

const app = express();

// Habilitar handlebars como view
// Para que funcione, se debe crear una carpeta llamada views y dentro otra llamada layouts
// Como hemos indicado que el defaultLayout se llamará layout, dentro de la carpeta layouts habrá
// que crear el archivo layout.handlebars
app.engine(
  'handlebars',
  engine({
    defaultLayout: 'layout',
  })
);
app.set('view engine', 'handlebars');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router());

app.listen(4000);
