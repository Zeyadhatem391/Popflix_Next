"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { otpSchema } from "@/shared/schemas/validationSchmas";
import { z } from "zod";

export type OtpFormData = z.infer<typeof otpSchema>;

export function useOtpVerify() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [isResending, setIsResending] = useState(false);

    const form = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
    });

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("verify_email");

        if (!storedEmail) {
            toast.error("Email not found. Please register again.");
            router.replace("/register");
            return;
        }

        setEmail(storedEmail);
    }, [router]);

    const onSubmit = async (data: OtpFormData) => {
        if (!email) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/register/verify`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        otp: data.otp,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message ?? "OTP verification failed.");
                return;
            }

            toast.success(result.message ?? "Account verified successfully.");

            sessionStorage.removeItem("verify_email");

            setTimeout(() => {
                router.replace("/login");
            }, 1500);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    const resendOtp = async () => {
        if (!email) return;

        setIsResending(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/otp/resend`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message ?? "Failed to resend OTP.");
                return;
            }

            toast.success(result.message ?? "OTP sent successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsResending(false);
        }
    };

    return {
        form,
        email,
        onSubmit,
        resendOtp,
        isResending,
    };
}