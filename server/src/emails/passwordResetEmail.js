const env = require("../config/env");

const passwordResetEmail = (token, expirationMinutes) => {
  const resetUrl = `${env.clientUrl}/reset-password?token=${token}`;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset your password</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #080d1c;
          font-family: Arial, Helvetica, sans-serif;
          color: #f8f9ff;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            background-color: #080d1c;
            padding: 40px 20px;
          "
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 520px;
                  background-color: #10172b;
                  border: 1px solid rgba(255, 255, 255, 0.13);
                  border-radius: 14px;
                  overflow: hidden;
                "
              >

                <tr>
                  <td
                    style="
                      padding: 28px 32px;
                      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    "
                  >
                    <div
                      style="
                        font-size: 20px;
                        font-weight: 700;
                        letter-spacing: -0.5px;
                        color: #f8f9ff;
                      "
                    >
                      Quiz<span style="color: #7c6cff;">Builder</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 36px 32px 32px;">

                    <div
                      style="
                        margin-bottom: 10px;
                        font-size: 12px;
                        font-weight: 600;
                        letter-spacing: 1.2px;
                        text-transform: uppercase;
                        color: #7c6cff;
                      "
                    >
                      Account Security
                    </div>

                    <h1
                      style="
                        margin: 0;
                        font-size: 28px;
                        line-height: 1.3;
                        font-weight: 700;
                        color: #f8f9ff;
                      "
                    >
                      Reset your password
                    </h1>

                    <p
                      style="
                        margin: 14px 0 0;
                        font-size: 15px;
                        line-height: 1.7;
                        color: #aeb8d0;
                      "
                    >
                      We received a request to reset the password for your
                      StudyAssistant account. Click the button below to create
                      a new password.
                    </p>

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-top: 28px;"
                    >
                      <tr>
                        <td align="center">

                          <a
                            href="${resetUrl}"
                            style="
                              display: inline-block;
                              padding: 14px 28px;
                              background-color: #7c6cff;
                              border: 1px solid #7c6cff;
                              border-radius: 10px;
                              color: #ffffff;
                              font-size: 14px;
                              font-weight: 600;
                              text-decoration: none;
                            "
                          >
                            Reset Password
                          </a>

                        </td>
                      </tr>
                    </table>

                    <p
                      style="
                        margin: 20px 0 0;
                        font-size: 13px;
                        line-height: 1.6;
                        color: #aeb8d0;
                        text-align: center;
                      "
                    >
                      This link expires in
                      <strong style="color: #6ee7e1;">
                        ${expirationMinutes} minutes
                      </strong>.
                    </p>

                    <div
                      style="
                        height: 1px;
                        margin: 28px 0;
                        background-color: rgba(255, 255, 255, 0.08);
                      "
                    ></div>

                    <p
                      style="
                        margin: 0;
                        font-size: 13px;
                        line-height: 1.6;
                        color: #aeb8d0;
                      "
                    >
                      If you didn't request a password reset, you can safely
                      ignore this email. Your password will remain unchanged.
                    </p>

                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding: 20px 32px;
                      background-color: rgba(255, 255, 255, 0.025);
                      border-top: 1px solid rgba(255, 255, 255, 0.06);
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        line-height: 1.5;
                        color: #aeb8d0;
                        text-align: center;
                      "
                    >
                      © ${new Date().getFullYear()} StudyAssistant
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

module.exports = passwordResetEmail;
