"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/chat");
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">
          Real-Time Chat App
        </h1>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 border rounded"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}