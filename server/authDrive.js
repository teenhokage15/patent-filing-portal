const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { getOAuthClient, TOKEN_PATH } = require("./utils/googleAuth");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const oAuth2Client = getOAuthClient();

// If token already exists, exit
if (fs.existsSync(TOKEN_PATH)) {
  console.log("Token already exists. OAuth setup complete.");
  process.exit(0);
}

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("Authorize this app by visiting this URL:\n", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from browser: ", async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log("Token stored successfully");
  } catch (err) {
    console.error("Error retrieving token:", err);
  }
  rl.close();
});
