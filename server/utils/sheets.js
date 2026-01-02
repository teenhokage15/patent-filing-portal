const { google } = require("googleapis");
const { getOAuthClient } = require("./googleAuth");

const appendToSheet = async (rowData) => {
  try {
    const authClient = getOAuthClient();

    const sheets = google.sheets({
      version: "v4",
      auth: authClient,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    console.log("Data appended to Google Sheet");
  } catch (error) {
    console.error("Google Sheets Error:", error.message);
  }
};

module.exports = appendToSheet;
