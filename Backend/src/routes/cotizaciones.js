import { Router } from 'express';
import nodemailer from 'nodemailer';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const router = Router();

// 1. LIMITADOR DE TRÁFICO
const quoteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 3, 
  message: { message: 'Has superado el límite de solicitudes. Por favor, intenta de nuevo en una hora.' },
  standardHeaders: true, 
  legacyHeaders: false, 
});

// 2. TRANSPORTER EN POOL (Mejora radical de rendimiento)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  auth: { user: env.email.user, pass: env.email.pass },
});

// 3. FUNCIÓN DE ESCAPE HTML TARDÍO
const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// 4. VALIDACIONES ESTRICTAS (Longitudes y tipos reales)
const validators = [
  body('nombre').isString().trim().isLength({ min: 1, max: 100 }),
  body('email').isEmail().isLength({ max: 254 }).normalizeEmail(),
  body('telefono').isString().trim().matches(/^[0-9+()\s-]{6,30}$/),
  body('projectType').isString().trim().isLength({ min: 1, max: 50 }),
  body('estilo').optional({ checkFalsy: true }).isString().trim().isLength({ max: 50 }),
  body('ideaText').isString().trim().isLength({ min: 1, max: 2000 }),
  body('colores').optional({ checkFalsy: true }).isString().trim().isLength({ max: 200 }),
  body('ancho').isInt({ min: 1, max: 10000 }).toInt(),
  body('alto').isInt({ min: 1, max: 10000 }).toInt(),
];

// 5. VALIDACIÓN BINARIA DE ADJUNTOS
const SIGNATURES = {
  'image/png':  (b) => b.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47])),
  'image/jpeg': (b) => b.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])),
  'image/webp': (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP',
};
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

const parseAttachment = (attachment) => {
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(attachment?.data ?? '');
  if (!match) return null;
  
  const [, mime, b64] = match;
  const content = Buffer.from(b64, 'base64');
  
  if (content.length === 0 || content.length > MAX_ATTACHMENT_BYTES || !SIGNATURES[mime](content)) {
    return null; 
  }
  return { filename: `referencia.${EXT[mime]}`, content, contentType: mime };
};

// 6. ARMADO DEL HTML
const buildEmailHtml = ({ nombre, telefono, email, projectType, estilo, ideaText, colores, ancho, alto, hasAttachment }) => `
  <div style="font-family: Arial, sans-serif; color: #000; max-width: 700px; margin: 0;">
    <h3 style="margin-bottom: 15px; color: #333;">Nueva Solicitud de Presupuesto</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
      <thead>
        <tr>
          <th style="padding: 8px; border: 1px solid #ccc; background-color: #f4f4f4; width: 30%;">Campo</th>
          <th style="padding: 8px; border: 1px solid #ccc; background-color: #f4f4f4;">Datos del Cliente</th>
        </tr>
      </thead>
      <tbody>
        <tr><td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Cliente</td><td style="padding: 8px; border: 1px solid #ccc;">${nombre}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Teléfono / WhatsApp</td><td style="padding: 8px; border: 1px solid #ccc;">${telefono}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ccc;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Tipo de Proyecto</td><td style="padding: 8px; border: 1px solid #ccc;">${projectType} ${estilo ? `(Estilo: ${estilo})` : ''}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Idea / Descripción</td><td style="padding: 8px; border: 1px solid #ccc;">${ideaText}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Colores Solicitados</td><td style="padding: 8px; border: 1px solid #ccc;">${colores}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Medidas (Ancho x Alto)</td><td style="padding: 8px; border: 1px solid #ccc;">${ancho} cm x ${alto} cm</td></tr>
      </tbody>
    </table>
    ${hasAttachment ? `<p style="font-size: 13px; color: #666; margin-top: 15px;"><em>* El cliente adjuntó una imagen de referencia auténtica. Revisá los archivos adjuntos.</em></p>` : ''}
  </div>
`;

// 7. RUTA PRINCIPAL
router.post('/enviar', quoteLimiter, validators, async (req, res) => {
  // Manejo de errores de validación de texto
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn("Intento de envío bloqueado: Datos no cumplen con las restricciones.");
    return res.status(400).json({ message: 'Datos inválidos. Revisa los campos del formulario.' });
  }

  try {
    const { nombre, email, telefono, projectType, estilo = '', ideaText, colores = '', ancho, alto } = req.body;

    // Validación estricta de la imagen
    const attachment = req.body.attachment ? parseAttachment(req.body.attachment) : null;
    if (req.body.attachment && !attachment) {
      return res.status(400).json({ message: 'La imagen adjunta no es válida (Solo JPG, PNG o WEBP, máx. 5 MB).' });
    }

    // Escapamos los caracteres peligrosos justo antes de inyectarlos en el HTML
    const safe = Object.fromEntries(
      Object.entries({ nombre, telefono, email, projectType, estilo, ideaText, colores })
        .map(([key, value]) => [key, escapeHtml(value)])
    );

    // Envío del correo con el replyTo para poder responder al cliente fácilmente
    await transporter.sendMail({
      from: `"NeonFlex Web" <${env.email.user}>`,
      to: env.email.user,
      replyTo: email,
      subject: `Cotización: ${nombre} - ${projectType}`, 
      html: buildEmailHtml({ ...safe, ancho, alto, hasAttachment: Boolean(attachment) }),
      attachments: attachment ? [attachment] : [],
    });

    res.json({ message: 'Cotización enviada con éxito' });
  } catch (error) {
    console.error('Error enviando correo:', error.message);
    res.status(500).json({ message: 'Error interno al intentar enviar el correo' });
  }
});

export default router;