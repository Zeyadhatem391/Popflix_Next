"use client";

import Link from "next/link";

import { Mail, LockKeyhole } from "@/assets/icons/Icons";

import { useLogin } from "@/modules/(auth)/login/hooks/useLogin";

import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function LoginForm() {
  const { form, onSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md rounded-xl bg-[#1e1e1e] p-6 shadow-lg animate-fadeInUp">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Login
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
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
                        placeholder="Email"
                        className="input"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                        className="input"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password */}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-10 w-full rounded-md bg-red-600 text-lg font-semibold text-white transition hover:bg-red-700"
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Google Login */}
        <div className="mt-4">
          <GoogleSignInButton />
        </div>

        
        <div className="flex justify-center mt-5">
          <Link
            href="/forgot-password"
            className="text-red-500 hover:text-red-400 transition text-lg"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Register */}
        <p className="mt-2 text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-red-500 hover:text-red-400"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
