import Campaign from "../models/Campaign.js";
import scheduleEmailJob from "../services/emailScheduler.js";

/**
 * Create and schedule a new email campaign
 */
export const createCampaign = async (req, res) => {
  try {
    const { title, message, recipients, scheduledTime } = req.body;

    if (!title || !message || !recipients?.length || !scheduledTime) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Prepare recipient statuses with default "pending"
    const recipientStatus = recipients.map((email) => ({
      email,
      status: "pending",
    }));

    // Create the campaign document
    const campaign = await Campaign.create({
      title,
      message,
      recipients: recipientStatus,
      scheduledTime,
    });

    // Schedule the email job using Handlebars template
    scheduleEmailJob(campaign);

    res
      .status(201)
      .json({ message: "✅ Campaign scheduled successfully", campaign });
  } catch (err) {
    console.error("❌ Error creating campaign:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Get all campaigns (latest first)
 */
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ scheduledTime: -1 });
    res.status(200).json(campaigns);
  } catch (err) {
    console.error("❌ Error fetching campaigns:", err.message);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};
