require("dotenv").config();

const requiredEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  baseUrl: requiredEnv("BASE_URL"),
  clientUrl: requiredEnv("CLIENT_URL"),

  brevo: {
    smtpHost: requiredEnv("BREVO_SMTP_HOST"),
    smtpPort: Number(process.env.BREVO_SMTP_PORT) || 587,
    smtpUser: requiredEnv("BREVO_SMTP_USER"),
    smtpKey: requiredEnv("BREVO_SMTP_KEY"),
    fromEmail: requiredEnv("BREVO_FROM_EMAIL"),
    fromName: requiredEnv("BREVO_FROM_NAME"),
  },

  mongoUri: requiredEnv("MONGO_URI"),

  sessionSecret: requiredEnv("SESSION_SECRET"),

  googleClientId: requiredEnv("GOOGLE_CLIENT_ID"),

  geminiApiKey: requiredEnv("GEMINI_API_KEY"),
};

module.exports = env;
