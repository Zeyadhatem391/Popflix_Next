"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { registerSchema } from "@/shared/schemas/validationSchmas";

export type RegisterData = {
    name: string;
    email: string;
    password: string;
};

export function useRegisterForm() {
    const router = useRouter();

    const form = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: RegisterData) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL_SING}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                toast.error(result.message ?? "Registration failed.");
                return;
            }
            sessionStorage.setItem("verify_email", data.email);

            toast.success(result.message);

            router.push("/otp-verify");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    return {
        form,
        onSubmit,
    };
}