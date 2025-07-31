import Campaign from "../models/Campaign.js";
import scheduleEmailJob from "../services/emailScheduler.js";

export const createCampaign = async (req, res) => {
  try {
    const { title, message, recipients, scheduledTime } = req.body;
    const recipientStatus = recipients.map((email) => ({ email }));
    const campaign = await Campaign.create({
      title,
      message,
      recipients: recipientStatus,
      scheduledTime,
    });
    scheduleEmailJob(campaign); // Schedule on creation
    res.status(201).json({ message: "Campaign scheduled", campaign });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ scheduledTime: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
