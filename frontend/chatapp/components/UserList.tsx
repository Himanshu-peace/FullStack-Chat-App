"use client";
import { getInitials } from "@/lib/avatar";

interface Props {
  users: any[];
  onlineUsers: string[];
  onSelectUser: (user: any) => void;
}

export default function UserList({
  users,
  onlineUsers,
  onSelectUser,
}: Props) {
  return (
    <div className="w-1/3 border-r p-4">
      <h2 className="font-bold mb-4">Users</h2>

      {/* List of users */}
      <div className="flex flex-col gap-2">
        {users.map((user) => {
            const isOnline = onlineUsers.includes(user._id);

            return (
            <div
                key={user._id}
                onClick={() => onSelectUser(user)}
                className="p-2 border rounded cursor-pointer flex items-center justify-between hover:bg-gray-100"
            >
                <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
                    {getInitials(user.username)}
                </div>

                <span>{user.username}</span>
                </div>

                {/* Status */}
                <span
                className={`text-xs ${
                    isOnline ? "text-green-500" : "text-gray-400"
                }`}
                >
                {isOnline ? "online" : "offline"}
                </span>
            </div>
            );
        })}
      </div>
    </div>
  );
}