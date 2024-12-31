"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.profileUpdateSchema = void 0;
const zod_1 = require("zod");
exports.profileUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    dob: zod_1.z.string().optional(),
    bio: zod_1.z.string().optional(),
    gender: zod_1.z.enum(["male", "female"]).optional(),
});
exports.changePasswordSchema = zod_1.z
    .object({
    oldPassword: zod_1.z.string().min(1, { message: "Password is required" }),
    newPassword: zod_1.z
        .string()
        .min(8, { message: "Old password is minimum 8 characters" }),
    newPasswordConfirm: zod_1.z.string(),
})
    .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "New passwords don't match",
    path: ["newPasswordConfirm"],
});
