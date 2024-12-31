import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  dob: z.string().optional(),
  bio: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Old password is minimum 8 characters" }),
    newPasswordConfirm: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "New passwords don't match",
    path: ["newPasswordConfirm"],
  });

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
