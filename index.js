const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Para cargar las variables de entorno

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB');
})
.catch((err) => {
  console.error('Error conectando a MongoDB:', err);
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Backend de WhitePadel funcionando!');
});

// Ruta para obtener la IP (temporal, solo para pruebas)
app.get('/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.send({ ip });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});