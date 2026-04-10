"use client";

import { useEffect } from "react";
import { connectSocket } from "@/lib/socket";

export default function ChatPage() {
  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("onlineUsers", (users) => {
      console.log("Online users:", users);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Chat</h1>
    </div>
  );
}