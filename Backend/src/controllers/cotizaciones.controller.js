import { parseAttachment, sendCotizacion } from '../services/mail.service.js';

export const enviarCotizacion = async (req, res) => {
  const attachment = req.body.attachment ? parseAttachment(req.body.attachment) : null;
  
  if (req.body.attachment && !attachment) {
    return res.status(400).json({ message: 'La imagen adjunta no es válida (Solo JPG, PNG o WEBP, máx. 5 MB).' });
  }

  await sendCotizacion(req.body, attachment);

  res.json({ message: 'Cotización enviada con éxito' });
};