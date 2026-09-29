"use client";

import { Mail } from "@/assets/icons/Icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/modules/(auth)/register/store/register.store";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export const emailVerification = z.object({
  email: z.email("Please enter a valid email address").trim().toLowerCase(),
});

export type emailVerificationInput = z.infer<typeof emailVerification>;

export default function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<emailVerificationInput>({
    resolver: zodResolver(emailVerification),
    mode: "all",
  });

  const findEmail = useUserStore((state) => state.findUserByEmail);

  const resetOtp = useUserStore((state) => state.setResetOtp);

  const onSubmit = async (data: emailVerificationInput) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = findEmail(data.email);

    if (!user) {
      toast.error("This email does not exist.");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = Date.now() + 5 * 60 * 1000;

    resetOtp(data.email, otp, expiresAt);

    await emailjs.send(
      "service_rrrvlap"!,
      "template_k1288zn"!,
      {
        passcode: otp,
        email: data.email,
      },
      "rG8T9iWmDEepT5Wla"!,
    );

    reset();
    router.push(`/otp-verify?email=${data.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl ds-bg-form p-6 shadow-lg animate-fadeInUp">
        <h2 className="mb-2 text-center text-2xl font-bold text-white">
          Forgot your password?
        </h2>

        <p className="mb-6 text-center text-sm text-gray-400">
          Enter your email address and we’ll send you a verification code to
          reset your password.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-zinc-200"
            >
              Email
            </Label>
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
              <p className="text-xs text-red-400"> {errors.email.message} </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full cursor-pointer rounded-xl bg-red-600 font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
          >
            {isSubmitting ? "Sending code..." : "Send verification code"}
          </Button>
        </form>


      </div>
    </div>
  );
}
