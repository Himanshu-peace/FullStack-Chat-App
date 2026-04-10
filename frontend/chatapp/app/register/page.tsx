"use client";

import { useRouter } from "next/navigation";
import API from "@/lib/api";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (username: string, password: string) => {
    try {
      const res = await API.post("/auth/register", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);

      router.push("/chat");
    } catch (error) {
      console.error("Register failed");
    }
  };

  return <AuthForm onSubmit={handleRegister} type="register" />;
}