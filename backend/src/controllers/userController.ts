import { Request, Response } from "express";
import User from "../models/User";
import { AuthRequest } from "../middleware/authMiddleware";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  const users = await User.find({
    _id: { $ne: req.userId },
  }).select("-password");
  res.json(users);
};