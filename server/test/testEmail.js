require("dotenv").config();

const sendEmail = require("../src/utils/sendEmail");

const testEmail = async () => {
  await sendEmail(
    "jeremyviterbo19@gmail.com",
    "ChatForge Test Email",
    "<h1>Hello!</h1><p>This email was sent through Brevo SMTP.</p>",
  );
};

testEmail()
  .then(() => console.log("Email sent"))
  .catch((error) => console.error("Email failed:", error));
