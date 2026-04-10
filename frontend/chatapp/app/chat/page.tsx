"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { connectSocket } from "@/lib/socket";
import UserList from "@/components/UserList";
import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";

export default function ChatPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/users");
      setUsers(res.data);
    };

    fetchUsers();

    const socket = connectSocket();

    socket.on("onlineUsers", (userIds: string[]) => {
      setOnlineUsers(userIds);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 ">
        <div className="w-1/4 border-r overflow-y-auto">
          <UserList
            users={users}
            onlineUsers={onlineUsers}
            onSelectUser={setSelectedUser}
          />
        </div>

        <div className="flex-1 flex flex-col ">
          {selectedUser ? (
            <ChatBox selectedUser={selectedUser} />
          ) : (
            <div className=" flex items-center justify-center h-full text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}