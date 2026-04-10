"use client";

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

      <div className="flex flex-col gap-2">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);

          return (
            <div
              key={user._id}
              onClick={() => onSelectUser(user)}
              className="p-2 border rounded cursor-pointer flex justify-between"
            >
              <span>{user.username}</span>
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