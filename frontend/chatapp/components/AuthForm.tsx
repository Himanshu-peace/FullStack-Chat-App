"use client";

import { useState } from "react";

interface Props {
  onSubmit: (username: string, password: string) => void;
  type: "login" | "register";
}

export default function AuthForm({ onSubmit, type }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <h1 className="text-xl font-bold text-center">
        {type === "login" ? "Login" : "Register"}
      </h1>

      <input
        className="border p-2 rounded"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bg-black text-white p-2 rounded"
        onClick={() => onSubmit(username, password)}
      >
        {type}
      </button>
    </div>
  );
}