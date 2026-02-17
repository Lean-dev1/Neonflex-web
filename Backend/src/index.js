import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload'; // Necesario para las fotos
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes.js'; // OJO: siempre pon .js al final

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración para recibir imágenes (IMPORTANTE)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

// Rutas
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Backend Neon Flex funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});