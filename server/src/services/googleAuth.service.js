const { OAuth2Client } = require("google-auth-library");
const env = require("../config/env");

const client = new OAuth2Client(env.googleClientId);

const verifyGoogleToken = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: env.googleClientId,
  });

  const payload = ticket.getPayload();

  return payload;
};

module.exports = {
  verifyGoogleToken,
};
