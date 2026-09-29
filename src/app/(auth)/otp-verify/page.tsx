"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import z from "zod";
import { useUserStore } from "@/modules/(auth)/register/store/register.store";

const otpVerification = z.object({
  otp: z
    .string()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});

type OtpVerificationInput = z.infer<typeof otpVerification>;

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OtpVerificationInput>({
    resolver: zodResolver(otpVerification),
    defaultValues: {
      otp: "",
    },
    mode: "all",
  });

  const otp = watch("otp");

  // Countdown
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    const number = value.replace(/\D/g, "").slice(-1);

    const currentOtp = otp.split("");

    currentOtp[index] = number;

    const newOtp = currentOtp.join("");

    setValue("otp", newOtp, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (number && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("New OTP:", newOtp);

    setCountdown(60);
    setIsResending(false);

    toast.success("A new verification code has been sent.");
  };

  const resetOtp = useUserStore((state) => state.resetOtp);

  const clearResetOtp = useUserStore((state) => state.clearResetOtp);

  const onSubmit = async (data: OtpVerificationInput) => {
    if (!resetOtp) {
      toast.error("Verification code not found.");
      return;
    }

    if (Date.now() > resetOtp.expiresAt) {
      clearResetOtp();

      toast.error("Verification code has expired. Please request a new one.");

      return;
    }

    if (data.otp !== resetOtp.otp) {
      toast.error("Invalid verification code.");
      return;
    }

    toast.success("Verification successful!");

    router.push(`/reset-password?email=${resetOtp.email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl ds-bg-form p-5 shadow-lg animate-fadeInUp">
        <div className="mb-6 space-y-2 text-center">
          <p className="text-xl font-bold tracking-tight text-white">
            Verify your email
          </p>

          <p className="text-sm leading-5 text-zinc-400">
            We sent a 6-digit verification code to
            <span className="mt-1 block font-semibold text-zinc-100">
              {email}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex justify-center gap-2 sm:gap-2.5">
            {Array.from({ length: 6 }).map((_, index) => (
              <Input
                key={index}
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                value={otp[index] ?? ""}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                inputMode="numeric"
                maxLength={1}
                className="h-11 w-10 rounded-lg border-zinc-700 bg-[#1e0d0b] text-center text-base font-bold text-white transition-colors focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20 sm:h-12 sm:w-11"
              />
            ))}
          </div>

          {errors.otp && (
            <p className="text-center text-xs text-red-400">
              {errors.otp.message}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || otp.length !== 6}
            className="h-10 w-full cursor-pointer rounded-lg bg-red-600 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify code"}
          </Button>

          <div className="space-y-2 text-center">
            {countdown > 0 ? (
              <p className="text-xs text-zinc-400">
                You can request a new code in{" "}
                <span className="font-semibold text-zinc-100">
                  {countdown}s
                </span>
              </p>
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={handleResend}
                disabled={isResending}
                className="h-8 cursor-pointer px-2 text-xs font-semibold text-red-500 hover:bg-transparent hover:text-red-400"
              >
                {isResending ? "Sending..." : "Resend verification code"}
              </Button>
            )}

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="h-8 gap-1.5 px-2 text-xs text-zinc-400 hover:bg-transparent hover:text-zinc-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Change email
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
