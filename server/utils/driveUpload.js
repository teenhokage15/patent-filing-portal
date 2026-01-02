const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const { getOAuthClient } = require("./googleAuth");

const uploadToDrive = async (file, folderId) => {
  const authClient = getOAuthClient(); // ✅ THIS WAS THE ISSUE

  const drive = google.drive({
    version: "v3",
    auth: authClient,
  });

  const fileMetadata = {
    name: file.originalname,
    parents: [folderId],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id",
  });

  // make file public
  await drive.permissions.create({
    fileId: response.data.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return `https://drive.google.com/file/d/${response.data.id}/view`;
};

module.exports = uploadToDrive;
