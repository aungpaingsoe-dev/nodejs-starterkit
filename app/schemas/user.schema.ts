import z from "zod";
import prisma from "../../prisma/client";

export const createUserSchema = z
    .object({
        name: z.string()
            .min(1, { message: "Name is required" })
            .refine(
                async (arg) => {
                    const result = await prisma.user.findFirst({
                        where: { name: arg },
                    });
                    return !result;
                },
                {
                    message: "Name is already exist",
                }
            ),
        email: z
            .string()
            .email({ message: "Invalid email address" })
            .min(1, { message: "Email is required" })
            .refine(
                async (arg) => {
                    const result = await prisma.user.findFirst({
                        where: {
                            email: arg,
                        },
                    });
                    return !result;
                },
                {
                    message: "Email is already exist",
                }
            ),
        dob: z.string().optional(),
        phone: z.string().optional(),
        bio: z.string().optional(),
        gender: z.enum(["male", "female"]).optional(),
        password: z
            .string()
            .min(8, { message: "Password is minimum 8 characters" }),
        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords don't match",
        path: ["passwordConfirm"],
    });

export const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    dob: z.string().optional(),
    phone: z.string().optional(),
    bio: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    password: z.string().optional(),
    passwordConfirm: z.string().optional(),
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;