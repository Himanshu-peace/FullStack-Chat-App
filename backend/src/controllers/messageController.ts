import { Request, Response } from "express";
import Message from "../models/Message";
import { AuthRequest } from "../middleware/authMiddleware";

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};