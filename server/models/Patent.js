const mongoose = require("mongoose");

const coInventorSchema = new mongoose.Schema(
  {
    name: String,
    uidEid: String,
    email: String,
    mobile: String,
  },
  { _id: false }
);

const patentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    personalDetails: {
      name: String,
      role: {
        type: String,
        enum: ["Student", "Teacher"],
      },
      uidEid: String,
      email: String,
      mobile: String,
      department: String,
    },

    patentDetails: {
      title: String,
      patentType: String,
      category: String,
    },

    coInventors: [coInventorSchema],

    files: {
      signatureUrl: String,
      patentPdfUrl: String,
    },

    status: {
      type: String,
      enum: ["SUBMITTED", "UNDER_PROCESS", "APPROVED", "REJECTED"],
      default: "SUBMITTED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patent", patentSchema);
