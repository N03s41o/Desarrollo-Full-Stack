require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('src/public')); // Para servir el HTML estático

connectDB();

// Rutas
const authController = require('./src/controllers/authController');
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.use('/api/products', require('./src/routes/productRoutes'));

// Exportar app para Vercel y para Tests, no hacer app.listen aquí directamente si usas serverless
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

module.exports = app;