"use client";

import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import { LoginSchema } from "@/lib/schemas/validationSchmas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  type FormValues = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    setErrorMessage("");

    const result = await signIn("credentials", {
      login: data.login,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      setErrorMessage(result?.error || "Login failed");
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-xl p-6 shadow-lg animate-fadeInUp">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              placeholder="Email"
              className="input"
              {...register("login")}
            />
            {errors.login && (
              <p className="text-red-500 text-sm">{errors.login.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="input"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <GoogleSignInButton />
        </div>

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
