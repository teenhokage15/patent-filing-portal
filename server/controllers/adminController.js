const User = require("../models/User");
const Patent = require("../models/Patent");

/**
 * GET all users
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * GET all patents
 */
exports.getAllPatents = async (req, res) => {
  try {
    const patents = await Patent.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(patents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patents" });
  }
};

/**
 * GET patents by user
 */
exports.getPatentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const patents = await Patent.find({ user: userId });
    res.status(200).json(patents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user patents" });
  }
};

/**
 * UPDATE patent status
 */
exports.updatePatentStatus = async (req, res) => {
  try {
    const { patentId } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "SUBMITTED",
      "UNDER_PROCESS",
      "APPROVED",
      "REJECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const patent = await Patent.findByIdAndUpdate(
      patentId,
      { status },
      { new: true }
    );

    if (!patent) {
      return res.status(404).json({ message: "Patent not found" });
    }

    res.status(200).json({
      message: "Patent status updated",
      patent,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

/**
 * DELETE patent
 */
exports.deletePatent = async (req, res) => {
  try {
    const { patentId } = req.params;

    const patent = await Patent.findByIdAndDelete(patentId);

    if (!patent) {
      return res.status(404).json({ message: "Patent not found" });
    }

    res.status(200).json({ message: "Patent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete patent" });
  }
};
