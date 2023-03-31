const nodemailer = require('nodemailer');

const sendEmail = (sender, reciever, subject, text, html) => {
    console.log(reciever);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: sender,
        to: reciever,
        subject: subject,
        text: text,
        html: html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log(`Email sent: ${info.response}`);
    });
}

module.exports = sendEmail;