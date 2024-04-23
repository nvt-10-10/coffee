import express from "express";
import StatisticalController from "../controllers/StatisticalController.js";

const router = express.Router();
router.get("", StatisticalController.getAllStatistical);

export default router;
