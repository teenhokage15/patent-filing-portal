const Patent = require("../models/Patent");
const uploadToDrive = require("../utils/driveUpload");
const appendToSheet = require("../utils/sheets");
const fs = require("fs");

exports.submitPatent = async (req, res) => {
  try {
    const {
      name,
      role,
      uidEid,
      email,
      mobile,
      department,
      title,
      patentType,
      category,
      coInventors,
    } = req.body;

    // basic validation
    if (!name || !email || !title || !patentType) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!req.files || !req.files.signature || !req.files.patentPdf) {
      return res.status(400).json({ message: "Files missing" });
    }

    // upload files to Google Drive
    const signatureUrl = await uploadToDrive(
      req.files.signature[0],
      process.env.GOOGLE_DRIVE_FOLDER_ID
    );

    const patentPdfUrl = await uploadToDrive(
      req.files.patentPdf[0],
      process.env.GOOGLE_DRIVE_FOLDER_ID
    );

    // create patent in DB
    const patent = await Patent.create({
      user: req.user.id,

      personalDetails: {
        name,
        role,
        uidEid,
        email,
        mobile,
        department,
      },

      patentDetails: {
        title,
        patentType,
        category,
      },

      coInventors: coInventors ? JSON.parse(coInventors) : [],

      files: {
        signatureUrl,
        patentPdfUrl,
      },
    });

    // append to Google Sheet
    await appendToSheet([
      patent._id.toString(),
      name,
      email,
      department,
      title,
      patentType,
      category,
      patent.status,
      patentPdfUrl,
      signatureUrl,
      new Date().toLocaleString(),
    ]);

    // delete local uploaded files
    fs.unlinkSync(req.files.signature[0].path);
    fs.unlinkSync(req.files.patentPdf[0].path);

    res.status(201).json({
      message: "Patent submitted successfully",
      patentId: patent._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Patent submission failed" });
  }
};
