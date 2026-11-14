const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = () => {
    const servicio = (process.env.EMAIL_SERVICE || 'MAILTRAP').toUpperCase().trim();

    // 1. Si eliges GMAIL explícitamente en tu .env (EMAIL_SERVICE=GMAIL)
    if (servicio === 'GMAIL' && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER.trim(),
                pass: process.env.GMAIL_APP_PASSWORD.replace(/\s+/g, '')
            }
        });
    }

    // 2. Si eliges MAILTRAP (por defecto) en tu .env (EMAIL_SERVICE=MAILTRAP)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 2525,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    // 3. Fallback de desarrollo seguro
    console.warn('Aviso: No se encontraron credenciales válidas en .env. Se usará transporte simulado.');
    return {
        sendMail: async (options) => {
            console.log('--- [SIMULADOR DE CORREO CGTHAM (DESARROLLO)] ---');
            console.log(`Para: ${options.to}`);
            console.log(`Asunto: ${options.subject}`);
            console.log(`Texto: ${options.text}`);
            console.log('--------------------------------------------------');
            return { response: '250 Correo simulado exitoso' };
        }
    };
};

const transporter = createTransporter();

const enviarCorreo = async (to, subject, text, html) => {
    const remitente = (process.env.EMAIL_SERVICE || '').toUpperCase() === 'GMAIL'
        ? process.env.GMAIL_USER
        : (process.env.SMTP_USER || 'no-reply@cgtham.org.mx');

    const mailOptions = {
        from: `"CGTHAM Plataforma" <${remitente}>`,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response || 'OK'}`);
        return { success: true, info };
    } catch (error) {
        console.error(`Error al enviar correo: ${error}`);
        throw error;
    }
};

module.exports = {
    enviarCorreo
};
