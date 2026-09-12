const sendEmail = require("../src/utils/sendEmail");
const verificationEmail = require("../src/emails/verificationEmail");

const testEmail = async () => {
  const code = "482913";
  const expirationMinutes = 10;

  const html = verificationEmail(code, expirationMinutes);

  await sendEmail(
    "jeremyviterbo19@gmail.com",
    "Verify your StudyAssistant email",
    html,
  );
};

testEmail()
  .then(() => console.log("Email sent successfully"))
  .catch((error) => {
    console.error("Email failed:", error);
    process.exit(1);
  });
