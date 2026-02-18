import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload'; 
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes.js'; 
import authRoutes from './routes/auth.routes.js'; // Asegúrate que el archivo tenga la 's' al final

dotenv.config();

const app = express();

// 1. PRIMERO LOS MIDDLEWARES (Configuraciones)
app.use(cors());
app.use(express.json()); // <--- Esto tiene que ir ANTES de las rutas

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

// 2. DESPUÉS LAS RUTAS
app.use('/api/auth', authRoutes);     // Login
app.use('/api/products', productRoutes); // Productos

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Backend Neon Flex funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});