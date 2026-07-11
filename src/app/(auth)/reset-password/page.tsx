"use client";

import Link from "next/link";

import { LockKeyhole } from "@/assets/icons/Icons";

import { useResetPassword } from "@/modules/(auth)/reset-password/hooks/useResetPassword";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function ResetPasswordForm() {
  const { form, email, onSubmit, resendOtp, isResending } = useResetPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md rounded-xl bg-[#1e1e1e] p-6 shadow-lg animate-fadeInUp">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Reset Password
        </h2>

        <p className="mb-1 text-center text-sm text-gray-400">
          Enter the verification code sent to
        </p>

        <p className="mb-6 break-all text-center font-medium text-red-500">
          {email}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Verification Code"
                      maxLength={6}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      className="h-12 text-center text-xl tracking-[10px] font-bold"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <Input
                        {...field}
                        type="password"
                        placeholder="New Password"
                        className="input"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-10 w-full rounded-md bg-red-600 text-lg font-semibold text-white transition hover:bg-red-700"
            >
              {form.formState.isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 border-t border-zinc-700 pt-5">
          <p className="text-center text-sm text-gray-400">
            Didn't receive the code?
          </p>

          <Button
            variant="ghost"
            onClick={resendOtp}
            disabled={isResending}
            className="mt-2 w-full text-red-500 hover:text-red-400"
          >
            {isResending ? "Sending..." : "Resend OTP"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="text-sm text-red-500 transition hover:text-red-400"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
