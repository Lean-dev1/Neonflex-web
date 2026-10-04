import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload'; 
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes.js'; 
import authRoutes from './routes/auth.routes.js';
import cotizacionesRoutes from './routes/cotizaciones.js';
dotenv.config();

const app = express();

//MIDLEWARES 
app.use(cors());
app.use(express.json()); 

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));


app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(`https://${req.header('host')}${req.url}`);
  }
  next();
});


app.use('/api/cotizaciones', cotizacionesRoutes);

//rutas 
app.use('/api/auth', authRoutes);     
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('API backend en funcionamiento');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`El servidor en el puerto ${PORT} se encuentra en correcto funcionamiento`);
});