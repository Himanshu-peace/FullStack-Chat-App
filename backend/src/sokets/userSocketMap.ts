const userSocketMap = new Map<string, string>();

export const addUser = (userId: string, socketId: string) => {
  userSocketMap.set(userId, socketId);
};

export const removeUser = (socketId: string) => {
  for (const [userId, sId] of userSocketMap.entries()) {
    if (sId === socketId) {
      userSocketMap.delete(userId);
      break;
    }
  }
};

export const getSocketId = (userId: string) => {
  return userSocketMap.get(userId);
};

export const getOnlineUsers = () => {
  return Array.from(userSocketMap.keys());
};