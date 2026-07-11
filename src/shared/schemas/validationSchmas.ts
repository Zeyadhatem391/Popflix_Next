import z from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(3, "name must be at least 3 characters")
            .max(20, "name must be at most 20 characters"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(50, "Password must be at most 50 characters"),
    })


export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});


export const profile = z.object({
    firstname: z
        .string()
        .min(3, "The firstname field must be a string, at lest 3chr"),
    lastname: z
        .string()
        .min(3, "The lastname field must be a string at lest 3chr"),
    email: z.string().email("valid email"),
    phone: z.string().regex(/^\+[\d\s-]{10,}$/, "format invalid"),
});


export const otpSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "OTP must contain only numbers"),
});


export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});


export const resetPasswordSchema = z.object({
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;