import { z } from "zod";
import prisma from "../../prisma/client";

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" })
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
            where: { email: arg },
          });
          return !result;
        },
        {
          message: "Email is already exist",
        }
      ),
    password: z
      .string()
      .min(8, { message: "Password is minimum 8 characters" }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export const signInSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
