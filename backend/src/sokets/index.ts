import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt";
import {
  addUser,
  removeUser,
  getOnlineUsers,
} from "./userSocketMap";
import {
  setUserOnline,
  setUserOffline,
} from "../utils/userStatus";
import Message from "../models/Message";
import { getSocketId } from "./userSocketMap";

export const initSocket = (io: Server) => {
  // Auth middleware
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = verifyToken(token);
      (socket as any).userId = decoded.userId;

      next();
    } catch (error) {
      next(new Error("Unauthorized"));
    }
  });

  // Connection handler
  io.on("connection", async (socket) => {
    const userId = (socket as any).userId;

    console.log("User connected:", userId);

    // Add to memory map
    addUser(userId, socket.id);

    // Update DB
    await setUserOnline(userId);

    // Broadcast online users
    io.emit("onlineUsers", getOnlineUsers());

    // Disconnect handler
    socket.on("disconnect", async () => {
      console.log("User disconnected:", userId);

      removeUser(socket.id);
      await setUserOffline(userId);

      io.emit("onlineUsers", getOnlineUsers());
    });

    socket.on("sendMessage", async ({ receiverId, content }) => {
        try {
            const senderId = (socket as any).userId;

            // Basic validation
            if (!receiverId || !content) {
            return;
            }

            // Store message in DB
            const message = await Message.create({
            sender: senderId,
            receiver: receiverId,
            content,
            });

            // Find receiver socket
            const receiverSocketId = getSocketId(receiverId);

            // Send to receiver only
            if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", message);
            }

            // Optional: send back to sender (confirmation)
            socket.emit("messageSent", message);
        } catch (error) {
            console.error("Message error:", error);
        }
    });
  });
};