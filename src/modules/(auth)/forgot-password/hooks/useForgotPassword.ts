"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { forgotPasswordSchema } from "@/shared/schemas/validationSchmas";


export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function useForgotPassword() {
  const router = useRouter();

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to send OTP.");
        return;
      }

      sessionStorage.setItem("reset_email", data.email);

      toast.success(
        result.message ?? "Verification code has been sent to your email."
      );

      router.push("/reset-password");
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