"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import z from "zod";
import { useUserStore } from "@/modules/(auth)/register/store/register.store";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "all",
  });

  const updatePassword = useUserStore((state) => state.updatePassword);

  const onSubmit = async (data: ResetPasswordInput) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const email = searchParams.get("email");

    if (!email) {
      toast.error("Invalid reset request.");
      return;
    }

    const success = updatePassword(email, data.password);

    if (!success) {
      toast.error("User not found.");
      return;
    }

    toast.success("Password reset successfully!");

    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1e0d0b] p-4">
      <div className="w-full max-w-md animate-fadeInUp rounded-xl ds-bg-form p-5 shadow-lg">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xl font-bold tracking-tight text-white">
            Reset your password
          </p>

          <p className="text-sm leading-5 text-zinc-400">
            Create a new password for your account. Make sure it is strong and
            easy for you to remember.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-zinc-200"
            >
              New password
            </Label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="h-10 rounded-lg border-zinc-700 bg-[#1e0d0b] pl-10 pr-10 text-sm text-white placeholder:text-zinc-600 transition-colors focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-200"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-zinc-200"
            >
              Confirm password
            </Label>

            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                {...register("confirmPassword")}
                className="h-10 rounded-lg border-zinc-700 bg-[#1e0d0b] pl-10 pr-10 text-sm text-white placeholder:text-zinc-600 transition-colors focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-zinc-200"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 w-full cursor-pointer rounded-lg bg-red-600 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Resetting password..." : "Reset password"}
          </Button>

          <p className="pt-1 text-center text-xs text-zinc-400">
            Remember your password?
            <Link
              href="/login"
              className="pl-1 font-semibold text-red-500 transition-colors hover:text-red-400"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Page;
