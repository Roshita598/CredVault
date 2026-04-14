import { Router } from "express";
import {
  startKYC,
  getStatus,
  simulateKYC,
} from "../controllers/kyc.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/start", authMiddleware, startKYC);
router.get("/status/:wallet", authMiddleware, getStatus);

// testing only
router.post("/simulate", authMiddleware, simulateKYC);

export default router;