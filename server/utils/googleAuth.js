const { google } = require("googleapis");

const getOAuthClient = () => {
  const credentials = JSON.parse(process.env.GOOGLE_OAUTH_CREDENTIALS);
  const { client_id, client_secret } = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "https://patent-filing-portal.onrender.com/oauth2callback"
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return oAuth2Client;
};

module.exports = { getOAuthClient };
