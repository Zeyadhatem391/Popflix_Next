"use client";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";

import { UserRound, Mail, LockKeyhole } from "@/assets/icons/Icons";
import { useRegisterForm } from "@/modules/(auth)/register/hooks/useRegisterForm";

export default function RegisterForm() {
  const { form, onSubmit } = useRegisterForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md rounded-xl bg-[#1e1e1e] p-6 shadow-lg animate-fadeInUp">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Create Account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <UserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Username"
                        className="input"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Email"
                        className="input"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="input"
                        {...field}
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
              className="h-10 w-full rounded-md bg-red-600 py-2 text-lg font-semibold text-white transition hover:bg-red-700"
            >
              {form.formState.isSubmitting ? "Loading..." : "Register"}
            </Button>
          </form>
        </Form>

        <div className="mt-4">
          <GoogleSignInButton />
        </div>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
