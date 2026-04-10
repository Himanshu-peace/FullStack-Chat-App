import User from "../models/User";

export const setUserOnline = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { isOnline: true });
};

export const setUserOffline = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { isOnline: false });
};