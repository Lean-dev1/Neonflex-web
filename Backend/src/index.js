const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products.routes');

const app = express();

// Middlewares
app.use(cors()); // Permite peticiones desde cualquier origen (React)
app.use(express.json()); // Permite leer JSON en el body

// Rutas
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Backend Cisneros funcionando 🚀');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});