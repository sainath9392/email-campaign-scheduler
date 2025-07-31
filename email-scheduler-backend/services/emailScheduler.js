
import nodemailer from "nodemailer";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";
import path from "path";
import Campaign from "../models/Campaign.js";
import dotenv from "dotenv";
dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Setup handlebars as the email template engine
const handlebarOptions = {
  viewEngine: {
    extname: ".hbs",
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
  extName: ".hbs",
};

transporter.use("compile", nodemailerExpressHandlebars(handlebarOptions));

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Error verifying transporter:", error);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

// Schedule and send email campaign
const scheduleEmailJob = (campaign) => {
  const scheduledDate = new Date(campaign.scheduledTime);
  const now = new Date();
  const delay = scheduledDate - now;

  if (delay < 0) {
    console.log("⏰ Scheduled time is in the past. Skipping campaign.");
    return;
  }

  setTimeout(async () => {
    try {
      const freshCampaign = await Campaign.findById(campaign._id);

      const results = await Promise.allSettled(
        freshCampaign.recipients.map((recipient) =>
          transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient.email,
            subject: freshCampaign.title,
            template: "campaign", // corresponds to views/campaign.hbs
            context: {
              title: freshCampaign.title,
              message: freshCampaign.message,
            },
          })
        )
      );

      freshCampaign.recipients = freshCampaign.recipients.map(
        (recipient, i) => ({
          email: recipient.email,
          status: results[i].status === "fulfilled" ? "sent" : "failed",
          error:
            results[i].status === "rejected" ? results[i].reason.message : "",
        })
      );

      const allSent = results.every((r) => r.status === "fulfilled");
      const noneSent = results.every((r) => r.status === "rejected");

      freshCampaign.status = allSent ? "sent" : noneSent ? "failed" : "partial";

      await freshCampaign.save();

      console.log(
        `📤 Campaign "${freshCampaign.title}" updated with status: ${freshCampaign.status}`
      );
    } catch (err) {
      console.error("❌ Email job failed:", err.message);
    }
  }, delay);
};

export default scheduleEmailJob;
