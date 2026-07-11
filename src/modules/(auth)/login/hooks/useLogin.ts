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
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result) {
        toast.error("Unable to login.");
        return;
      }

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Login successful.");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return {
    form,
    onSubmit,
  };
} 