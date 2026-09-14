const verificationEmail = (code, expirationMinutes) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify your email</title>
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
                      Account Verification
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
                      Verify your email
                    </h1>

                    <p
                      style="
                        margin: 14px 0 0;
                        font-size: 15px;
                        line-height: 1.7;
                        color: #aeb8d0;
                      "
                    >
                      Thanks for creating your StudyAssistant account.
                      Enter the verification code below to confirm your
                      email address.
                    </p>

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-top: 28px;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            padding: 22px;
                            background-color: rgba(124, 108, 255, 0.10);
                            border: 1px solid rgba(124, 108, 255, 0.25);
                            border-radius: 12px;
                          "
                        >
                          <div
                            style="
                              margin-bottom: 8px;
                              font-size: 11px;
                              font-weight: 600;
                              letter-spacing: 1.5px;
                              text-transform: uppercase;
                              color: #aeb8d0;
                            "
                          >
                            Verification Code
                          </div>

                          <div
                            style="
                              font-size: 32px;
                              line-height: 1.2;
                              font-weight: 700;
                              letter-spacing: 8px;
                              color: #f8f9ff;
                            "
                          >
                            ${code}
                          </div>
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
                      This code expires in
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
                      If you didn't request this verification email,
                      you can safely ignore it. Your account will remain
                      unchanged.
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

module.exports = verificationEmail;
