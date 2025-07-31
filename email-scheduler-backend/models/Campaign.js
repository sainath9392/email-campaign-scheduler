import mongoose from "mongoose";

const recipientStatusSchema = new mongoose.Schema({
  email: String,
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
  error: String,
});

const campaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [recipientStatusSchema],
  scheduledTime: Date,
  status: {
    type: String,
    enum: ["pending", "sent", "failed"],
    default: "pending",
  },
});

export default mongoose.model("Campaign", campaignSchema);
