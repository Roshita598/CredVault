import { Router } from "express";
import {
  startKYC,
  getStatus,
  simulateKYC,
} from "../controllers/kyc.controller.js";

const router = Router();

router.post("/start", startKYC);
router.get("/status/:wallet", getStatus);

// testing only
router.post("/simulate", simulateKYC);

export default router;