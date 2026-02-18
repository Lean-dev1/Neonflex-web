import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload'; 
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes.js'; 
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

// --- ZONA DE CONFIGURACIÓN (MIDDLEWARES) ---
// ¡ESTO TIENE QUE IR PRIMERO!
app.use(cors());
app.use(express.json()); // <--- CRÍTICO: Permite leer el usuario y contraseña

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

// --- ZONA DE RUTAS ---
// Ahora sí, definimos las rutas después de configurar json
app.use('/api/auth', authRoutes);     
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Backend Neon Flex funcionando 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});