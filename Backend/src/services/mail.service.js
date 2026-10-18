import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,      // <-- Cambiar de 465 a 587
  secure: false,
  pool: true,
  auth: { user: env.email.user, pass: env.email.pass },
});

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const SIGNATURES = {
  'image/png':  (b) => b.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47])),
  'image/jpeg': (b) => b.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff])),
  'image/webp': (b) => b.subarray(0, 4).toString('latin1') === 'RIFF' && b.subarray(8, 12).toString('latin1') === 'WEBP',
};
const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' };
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

export const parseAttachment = (attachment) => {
  const match = /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(attachment?.data ?? '');
  if (!match) return null;
  
  const [, mime, b64] = match;
  const content = Buffer.from(b64, 'base64');
  
  if (content.length === 0 || content.length > MAX_ATTACHMENT_BYTES || !SIGNATURES[mime](content)) {
    return null; 
  }
  return { filename: `referencia.${EXT[mime]}`, content, contentType: mime };
};

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

// Función principal que usarán los controladores
export const sendCotizacion = async (data, attachment) => {
  const safe = Object.fromEntries(
    Object.entries({ 
      nombre: data.nombre, telefono: data.telefono, email: data.email, 
      projectType: data.projectType, estilo: data.estilo || '', 
      ideaText: data.ideaText, colores: data.colores || '' 
    }).map(([key, value]) => [key, escapeHtml(value)])
  );

  await transporter.sendMail({
    from: `"NeonFlex Web" <${env.email.user}>`,
    to: env.email.user,
    replyTo: data.email,
    subject: `Cotización: ${safe.nombre} - ${safe.projectType}`,
    html: buildEmailHtml({ ...safe, ancho: data.ancho, alto: data.alto, hasAttachment: Boolean(attachment) }),
    attachments: attachment ? [attachment] : [],
  });
};