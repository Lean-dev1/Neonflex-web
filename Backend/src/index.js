import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload'; 
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes.js'; 
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

//MIDLEWARES 
app.use(cors());
app.use(express.json()); 

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

//aca se definen las rutas 
app.use('/api/auth', authRoutes);     
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API backend en funcionamiento');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor en el puerto ${PORT} se encuentra en correcto funcionamiento`);
});