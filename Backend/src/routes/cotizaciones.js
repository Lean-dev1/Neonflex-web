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
      <div style="background-color: #050508; color: #e2e8f0; padding: 30px; font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 8px;">
        <div style="border-left: 4px solid #00f0ff; padding-left: 15px; margin-bottom: 25px;">
          <h2 style="color: #00f0ff; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">Nuevo Presupuesto</h2>
          <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px;">NEON FLEX PREMIUM</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #1e293b; width: 35%; color: #94a3b8; font-size: 13px; text-transform: uppercase;">Cliente</td>
            <td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #fff; font-weight: bold;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px; text-transform: uppercase;">WhatsApp</td>
            <td style="padding: 10px; border-bottom: 1px solid #1e293b;"><a href="https://wa.me/${telefono.replace(/\D/g,'')}" style="color: #43e77d; text-decoration: none; font-weight: bold;">${telefono} ↗</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 13px; text-transform: uppercase;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #1e293b; color: #00f0ff;">${email}</td>
          </tr>
        </table>

        <h3 style="color: #fff; border-bottom: 1px solid #1e293b; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; font-size: 14px;">Detalles del Diseño</h3>
        
        <div style="background-color: #0f172a; padding: 15px; border-radius: 4px; margin-bottom: 15px;">
          <p style="margin: 0 0 10px 0;"><strong style="color: #00f0ff;">Tipo:</strong> ${projectType} ${projectType === 'Frase' ? `(${estilo})` : ''}</p>
          <p style="margin: 0 0 10px 0;"><strong style="color: #00f0ff;">Idea:</strong> ${ideaText}</p>
          <p style="margin: 0 0 10px 0;"><strong style="color: #00f0ff;">Colores:</strong> ${colores}</p>
          <p style="margin: 0;"><strong style="color: #00f0ff;">Medidas Aprox:</strong> ${ancho}cm x ${alto}cm</p>
        </div>
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