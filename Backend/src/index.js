import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import cotizacionesRoutes from './routes/cotizaciones.js'; // Asegurate de que el nombre coincida con tu archivo
import { globalLimiter } from './middlewares/rateLimiters.js';

const app = express();

// 1. Confiar en el proxy (Render, Railway, etc.) para que los rate limiters lean IPs reales
app.set('trust proxy', 1);

// 2. Redirección estricta a HTTPS ANTES de parsear JSON pesados
app.use((req, res, next) => {
  if (env.isProd && !req.secure && req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(308, `https://${env.publicHost}${req.originalUrl}`);
  }
  next();
});

// 3. Seguridad y CORS
app.use(helmet());
app.use(cors({
  origin: env.frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Escudo contra saturación general
app.use('/api', globalLimiter);

// 4. Parcialización de payloads (El gran acierto del auditor)
// SÓLO cotizaciones recibe 8MB para las fotos base64
app.use('/api/cotizaciones', express.json({ limit: '8mb' }), cotizacionesRoutes);

// El resto de la aplicación usa un límite estricto de 100kb para no ahogar el procesador
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' })); 

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('API backend en funcionamiento'));

// 5. Manejador de Rutas Inexistentes
app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada.' }));

// 6. Manejador Global de Errores (Atrapa JSON rotos sin crashear)
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  if (status >= 500) console.error("Error en servidor:", err);
  
  const message =
    err.type === 'entity.parse.failed' ? 'El formato de los datos es inválido (JSON malformado).'
    : err.expose ? err.message
    : 'Error interno del servidor.';
    
  res.status(status).json({ message });
});

app.listen(env.port, () => console.log(`🚀 Servidor blindado corriendo en el puerto ${env.port}`));