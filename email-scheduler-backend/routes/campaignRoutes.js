import express from "express";
import {
  createCampaign,
  getAllCampaigns,
} from "../controllers/campaignController.js";

const router = express.Router();

router.post("/", createCampaign);
router.get("/", getAllCampaigns);

export default router;
