"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b bg-white">
      <h1 className="font-bold text-lg">Chat App</h1>

      <button
        onClick={logout}
        className="text-sm bg-black text-white px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}