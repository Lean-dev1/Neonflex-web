import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/enviar', async (req, res) => {
  const { nombre, email, telefono, projectType, ideaText, colores, estilo, ancho, alto, attachment } = req.body;

 
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const htmlEmail = `
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
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Cliente</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Teléfono / WhatsApp</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${telefono}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Email</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Tipo de Proyecto</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${projectType} ${projectType === 'Frase' ? `(Estilo: ${estilo})` : ''}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Idea / Descripción</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${ideaText}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Colores Solicitados</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${colores}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ccc; font-weight: bold;">Medidas (Ancho x Alto)</td>
              <td style="padding: 8px; border: 1px solid #ccc;">${ancho} cm x ${alto} cm</td>
            </tr>
          </tbody>
        </table>

        ${attachment ? `<p style="font-size: 13px; color: #666; margin-top: 15px;"><em>* El cliente adjuntó una imagen de referencia. Por favor, revisa los archivos adjuntos de este correo.</em></p>` : ''}
      </div>
    `;

    const mailOptions = {
      from: `"NeonFlex Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Cotización: ${nombre} - ${projectType}`,
      html: htmlEmail,
      attachments: attachment ? [{ filename: attachment.name, path: attachment.data }] : []
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Cotización enviada con éxito' });
    
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ message: 'Error interno al intentar enviar el correo' });
  }
});

export default router;