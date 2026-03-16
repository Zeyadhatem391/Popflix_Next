import z from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters"),
        email: z.string().email("Invalid email address"),
        phone: z
            .string()
            .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "Phone number must be valid Egyptian number"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(50, "Password must be at most 50 characters"),
        password_confirmation: z.string().min(1, "Please confirm your password"),
        agree_terms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: "Passwords do not match",
    });





export const loginSchema = z.object({
    login: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            "Password must contain at least one capital letter, a number, and a symbol."
        ),
})
