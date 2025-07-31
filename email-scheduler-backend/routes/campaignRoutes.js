import express from "express";
import {
  createCampaign,
  getAllCampaigns,
} from "../controllers/campaignController.js";


const router = express.Router();

router.post("/", createCampaign); // 🔐 Protected
router.get("/", getAllCampaigns); // 🔐 Add this protection

export default router;
