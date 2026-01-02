const express = require("express");
const { submitPatent } = require("../controllers/patentController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../utils/multer");

const router = express.Router();

router.post(
  "/submit",
  protect,
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "patentPdf", maxCount: 1 },
  ]),
  submitPatent
);

module.exports = router;
