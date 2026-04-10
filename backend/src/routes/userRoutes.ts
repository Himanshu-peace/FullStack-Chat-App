import express from "express";
import { protect, AuthRequest } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", protect, (req: AuthRequest, res) => {
  res.json({ userId: req.userId });
});

export default router;