import mongoose from "mongoose";

// Schema for individual recipient's email status
const recipientStatusSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
  error: {
    type: String,
    default: "",
  },
});

// Main campaign schema
const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    recipients: {
      type: [recipientStatusSchema],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one recipient is required.",
      },
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "sent", "failed", "partial"], // ✅ added "partial"
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Campaign", campaignSchema);
