"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormItem,
  Form,
  FormField,
  FormMessage,
} from "@/components/ui/form";

import { registerSchema } from "@/lib/schemas/validationSchmas";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import Link from "next/link";
import { UserRound, Mail, Phone, LockKeyhole } from "lucide-react";

type RegisterData = {
  username: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  agree_terms: boolean;
};

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      agree_terms: true,
    },
  });


  const passwordValue = form.watch("password");
  form.setValue("password_confirmation", passwordValue);

  const onSubmit = async (data: RegisterData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_SING}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
          password_confirmation: data.password_confirmation,
          agree_terms: data.agree_terms,
        }),
      }
    );

    const result = await response.json();
    console.log("Register response:", result);

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-xl p-6 shadow-lg animate-fadeInUp">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Create Account
        </h2>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Username"
                        {...field}
                        className="input "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="input "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        {...field}
                        className="input "
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
                      <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="input "
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-lg text-white font-semibold py-2 h-10 rounded-md transition"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Loading..." : "Register"}
            </Button>
          </form>
        </Form>

        {/* Social */}
        <div className="mt-4">
          <GoogleSignInButton />
        </div>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}