import cron from "node-cron";
import nodemailer from "nodemailer";
import Campaign from "../models/Campaign.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const scheduleEmailJob = (campaign) => {
  const scheduledDate = new Date(campaign.scheduledTime);
  const now = new Date();
  const delay = scheduledDate - now;

  if (delay < 0) return;

  setTimeout(async () => {
    try {
      const freshCampaign = await Campaign.findById(campaign._id);
      const results = await Promise.allSettled(
        freshCampaign.recipients.map((recipient) =>
          transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient.email,
            subject: freshCampaign.title,
            html: freshCampaign.message,
          })
        )
      );

      // Update status
      results.forEach((result, i) => {
        freshCampaign.recipients[i].status =
          result.status === "fulfilled" ? "sent" : "failed";
        if (result.status === "rejected") {
          freshCampaign.recipients[i].error = result.reason.message;
        }
      });

      freshCampaign.status = results.every((r) => r.status === "fulfilled")
        ? "sent"
        : "failed";
      await freshCampaign.save();
    } catch (err) {
      console.error("❌ Email sending failed:", err.message);
    }
  }, delay);
};

export default scheduleEmailJob;
