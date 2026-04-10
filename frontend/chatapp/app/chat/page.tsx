"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { connectSocket } from "@/lib/socket";
import UserList from "@/components/UserList";

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
    <div className="flex h-screen">
      <UserList
        users={users}
        onlineUsers={onlineUsers}
        onSelectUser={setSelectedUser}
      />

      <div className="flex-1 p-4">
        {selectedUser ? (
          <h2 className="text-lg font-bold">
            Chat with {selectedUser.username}
          </h2>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
}