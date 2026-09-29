"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";
import { useUserStore } from "@/modules/(auth)/register/store/register.store";
import { loginSchema } from "@/shared/schemas/validationSchmas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import Cookies from "js-cookie";


export type LoginUserInput = z.infer<typeof loginSchema>;

function page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserInput>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const login = useUserStore((state) => state.login);

  const onSubmit = async (data: LoginUserInput) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = login(data.email, data.password);

    if (!user) {
      toast.error("Invalid email or password");
      return;
    }
     Cookies.set(
      "user",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
      {
        expires: 10,
        sameSite: "lax",
      },
    );

    toast.success(`Welcome ${user.name}`);

    reset();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-105 rounded-xl ds-bg-form p-6 shadow-lg animate-fadeInUp">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Welcome back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="h-10 rounded-lg border-zinc-700 bg-[#1e0d0b] pl-10 text-sm text-white placeholder:text-zinc-600 transition-colors focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20"
              />
            </div>

            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-red-600 transition-colors hover:text-red-500"
              >
                Forgot password?
              </Link>
            </div>

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

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 w-full cursor-pointer rounded-lg bg-red-600 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          <GoogleSignInButton />

          <p className="pt-1 text-center text-sm text-zinc-400">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="pl-1 font-semibold text-red-600 underline transition-colors hover:text-red-500"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default page;
