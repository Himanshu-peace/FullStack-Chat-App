"use client";

import { useRouter } from "next/navigation";
import API from "@/lib/api";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      router.push("/chat");
    } catch (error) {
      console.error("Login failed");
    }
  };

  return <AuthForm onSubmit={handleLogin} type="login" />;
}