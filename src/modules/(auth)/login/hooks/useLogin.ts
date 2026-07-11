"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod";

import { loginSchema } from "@/shared/schemas/validationSchmas";

export type LoginData = z.infer<typeof loginSchema>;

export function useLogin() {
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    console.group("🔐 Login Debug");

    try {
      console.log("📤 Form Data:", data);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      console.log("✅ signIn Result:", result);

      if (!result) {
        console.error("❌ signIn returned null");
        toast.error("Unable to login.");
        console.groupEnd();
        return;
      }

      if (result.error) {
        console.error("❌ signIn Error:", result.error);
        toast.error(result.error);
        console.groupEnd();
        return;
      }

      console.log("✅ Login Success");
      toast.success("Login successful.");

      console.log("➡️ Redirecting to home...");
      router.replace("/");
      router.refresh();

      console.log("🔄 Router refreshed");
    } catch (error) {
      console.error("💥 Login Exception:", error);
      toast.error("Something went wrong.");
    } finally {
      console.groupEnd();
    }
  };

  return {
    form,
    onSubmit,
  };
}