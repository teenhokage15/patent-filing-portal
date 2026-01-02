const express = require("express");
const {
  getAllUsers,
  getAllPatents,
  getPatentsByUser,
  updatePatentStatus,
  deletePatent,
} = require("../controllers/adminController");

const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

const router = express.Router();

// all routes are admin protected
router.use(protect, isAdmin);

router.get("/users", getAllUsers);
router.get("/patents", getAllPatents);
router.get("/patents/user/:userId", getPatentsByUser);
router.patch("/patents/:patentId/status", updatePatentStatus);
router.delete("/patents/:patentId", deletePatent);

module.exports = router;
