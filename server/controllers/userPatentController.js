const Patent = require("../models/Patent");

/**
 * GET logged-in user's patents
 */
exports.getMyPatents = async (req, res) => {
  try {
    const patents = await Patent.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(patents);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patents" });
  }
};

/**
 * GET single patent by ID (only if owned by user)
 */
exports.getMyPatentById = async (req, res) => {
  try {
    const { patentId } = req.params;

    const patent = await Patent.findOne({
      _id: patentId,
      user: req.user.id,
    });

    if (!patent) {
      return res.status(404).json({ message: "Patent not found" });
    }

    res.status(200).json(patent);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patent" });
  }
};

/**
 * DELETE patent (only if not approved)
 */
exports.deleteMyPatent = async (req, res) => {
  try {
    const { patentId } = req.params;

    const patent = await Patent.findOne({
      _id: patentId,
      user: req.user.id,
    });

    if (!patent) {
      return res.status(404).json({ message: "Patent not found" });
    }

    if (patent.status === "APPROVED") {
      return res
        .status(403)
        .json({ message: "Approved patents cannot be deleted" });
    }

    await patent.deleteOne();

    res.status(200).json({ message: "Patent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete patent" });
  }
};
