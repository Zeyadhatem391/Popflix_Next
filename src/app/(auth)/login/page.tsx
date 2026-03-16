"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/validationSchmas";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginData = {
  login: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    const result = await signIn("credentials", {
      login: data.login,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      toast.success("Login successful");
      router.push("/");
    } else {
      toast.error(result?.error || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-xl p-6 shadow-lg animate-fadeInUp">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Login
        </h2>

        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Email */}
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="input text-lg h-11 border-2 border-gray-200 rounded-lg placeholder:text-[16px]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500 text-sm" />
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
                    <Input
                      type="password"
                      placeholder="Password"
                      className="input text-lg h-11 border-2 border-gray-200 rounded-lg placeholder:text-[16px]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Login Button */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-lg text-white font-semibold py-2 h-10 rounded-md transition"
            >
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        {/* Social Login */}
        <div className="mt-2 flex flex-col gap-2">
          <GoogleSignInButton />
        </div>

        {/* Register */}
        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-red-600 underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
