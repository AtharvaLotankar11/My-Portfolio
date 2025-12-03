const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// For Gmail
const gmailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

// For SendGrid (uncomment if using SendGrid)
// const sendgridTransporter = nodemailer.createTransport({
//     host: 'smtp.sendgrid.net',
//     port: 587,
//     auth: {
//         user: 'apikey',
//         pass: process.env.SENDGRID_API_KEY
//     }
// });

const transporter = gmailTransporter;

module.exports = transporter;
