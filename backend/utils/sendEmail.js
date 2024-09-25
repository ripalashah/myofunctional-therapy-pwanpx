// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'myofunctiontherapy@gmail.com',
            pass: 'efyx qbuq jrtf kzzx'
        }
    });

    const mailOptions = {
        from: 'myofunctiontherapy@gmail.com',
        to,
        subject,
        text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;