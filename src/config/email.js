const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_APP_PASSWORD
    }
})

const enviarCorreo = async (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

module.exports = {
    enviarCorreo
}