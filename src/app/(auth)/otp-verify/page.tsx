"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { ShieldCheck } from "lucide-react";

import { useOtpVerify } from "@/modules/(auth)/otp-verify/hooks/useOtpVerify";

export default function OtpVerifyForm() {
  const { form, onSubmit, resendOtp, isResending, email } = useOtpVerify();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md rounded-xl bg-[#1e1e1e] p-6 shadow-lg animate-fadeInUp">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
            <ShieldCheck className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <h1 className="mt-5 text-center text-2xl font-bold text-white">
          Verify Your Account
        </h1>

        <p className="mt-3 text-center text-sm text-gray-400">
          We've sent a verification code to
        </p>

        <p className="mb-6 text-center font-medium text-red-500 break-all">
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
                      placeholder="Enter OTP"
                      maxLength={6}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      className="h-12 text-center text-2xl tracking-[12px] font-bold"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full bg-red-600 text-white hover:bg-red-700"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Verifying..." : "Verify OTP"}
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
      </div>
    </div>
  );
}
