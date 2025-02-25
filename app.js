const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);