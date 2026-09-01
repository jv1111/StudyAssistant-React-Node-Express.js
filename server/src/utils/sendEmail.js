const nodemailer = require("nodemailer");
const env = require("../config/env");

const transporter = nodemailer.createTransport({
  host: env.brevo.smtpHost,
  port: env.brevo.smtpPort,
  secure: false,
  auth: {
    user: env.brevo.smtpUser,
    pass: env.brevo.smtpKey,
  },
});

const sendEmail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: `"${env.brevo.fromName}" <${env.brevo.fromEmail}>`,
    to,
    subject,
    html,
  });

  return info;
};

module.exports = sendEmail;
