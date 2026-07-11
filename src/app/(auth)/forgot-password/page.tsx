"use client";

import Link from "next/link";

import { ArrowLeft, Mail } from "@/assets/icons/Icons";

import { useForgotPassword } from "@/modules/(auth)/forgot-password/hooks/useForgotPassword";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function ForgotPasswordForm() {
  const { form, onSubmit } = useForgotPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md rounded-xl bg-[#1e1e1e] p-6 shadow-lg animate-fadeInUp">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Forgot Password
        </h2>

        <p className="mb-6 text-center text-sm text-gray-400">
          Enter your email address and we'll send you a verification code.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <Input
                        {...field}
                        type="email"
                        placeholder="Email Address"
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
              {form.formState.isSubmitting
                ? "Sending..."
                : "Send Verification Code"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-gray-400"
          >
            <ArrowLeft width={20} height={20} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
