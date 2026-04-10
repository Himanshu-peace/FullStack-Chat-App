"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { getSocket } from "@/lib/socket";

interface Props {
  selectedUser: any;
}

export default function ChatBox({ selectedUser }: Props) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  // Fetch old messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await API.get(`/messages/${selectedUser._id}`);
      setMessages(res.data);
    };

    fetchMessages();
  }, [selectedUser]);

  // Listen for incoming messages
  useEffect(() => {
    const socket = getSocket();

    socket.on("receiveMessage", (message) => {
      if (message.sender === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser]);

  useEffect(() => {
    const socket = getSocket();

    socket.on("messageSent", (message) => {
        if (message.receiver === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
        }
    });

    return () => {
        socket.off("messageSent");
    };
  }, [selectedUser]);

  // Send message
  const sendMessage = () => {
    const socket = getSocket();

    socket.emit("sendMessage", {
      receiverId: selectedUser._id,
      content: text,
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full">
        <div className="border-b p-3 font-semibold">
            {selectedUser.username}
        </div>
      {/* Messages */}
      {/* <div className="flex-1 overflow-y-auto border p-2">
        {messages.map((msg) => (
          <div key={msg._id} className="mb-2">
            <span className="font-bold">
              {msg.sender === selectedUser._id ? "Them" : "You"}:
            </span>{" "}
            {msg.content}
          </div>
        ))}
      </div> */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg) => {
            const isMe = msg.sender !== selectedUser._id;

            return (
                <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                <div
                    className={`px-3 py-2 rounded max-w-xs ${
                    isMe ? "bg-black text-white" : "bg-gray-200 text-black"
                    }`}
                >
                    {msg.content}
                </div>
                </div>
            );
            })}
        </div>

      {/* Input */}
        <div className="flex gap-2 p-3 border-t bg-white">
            <input
                className="flex-1 border p-2 rounded focus:outline-none"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                className="bg-black text-white px-4 rounded"
                onClick={sendMessage}
            >
                Send
            </button>
        </div>
    </div>
  );
}