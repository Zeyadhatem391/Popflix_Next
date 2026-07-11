"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  resetPasswordSchema,
  type ResetPasswordData,
} from "@/shared/schemas/validationSchmas";

export function useResetPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("reset_email");

    if (!storedEmail) {
      toast.error("Session expired. Please try again.");

      router.replace("/forgot-password");

      return;
    }

    setEmail(storedEmail);
  }, [router]);

  const onSubmit = async (data: ResetPasswordData) => {
    if (!email) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            otp: data.otp,
            newPassword: data.newPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Reset password failed.");

        return;
      }

      toast.success(result.message);

      sessionStorage.removeItem("reset_email");

      form.reset();

      router.replace("/login");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    }
  };

  const resendOtp = async () => {
    if (!email) return;

    setIsResending(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/otp/resend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to resend OTP.");

        return;
      }

      toast.success(result.message);
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setIsResending(false);
    }
  };

  return {
    form,
    email,
    onSubmit,
    resendOtp,
    isResending,
  };
} 