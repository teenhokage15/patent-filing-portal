const express = require("express");
const {
  getMyPatents,
  getMyPatentById,
  deleteMyPatent,
} = require("../controllers/userPatentController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// all routes require login
router.use(protect);

router.get("/my-patents", getMyPatents);
router.get("/my-patents/:patentId", getMyPatentById);
router.delete("/my-patents/:patentId", deleteMyPatent);

module.exports = router;
