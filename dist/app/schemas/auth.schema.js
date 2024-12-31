"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = exports.forgotPasswordVerifyOtpSchema = exports.forgotPasswordRequestOtpSchema = exports.verifyOtpSchema = exports.requestOtpSchema = void 0;
const zod_1 = require("zod");
exports.requestOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1, { message: "Email is required" }),
});
exports.verifyOtpSchema = zod_1.z.object({
    otp: zod_1.z.string().min(6, { message: "OTP code is invalid" }),
});
exports.forgotPasswordRequestOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1, { message: "Email is required" }),
});
exports.forgotPasswordVerifyOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1, { message: "Email is required" }),
    otp: zod_1.z.string().min(4, { message: "OTP code is invalid" }),
});
exports.signUpSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    email: zod_1.z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password is minimum 8 characters" }),
    passwordConfirm: zod_1.z.string(),
})
    .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
});
exports.signInSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Email or username is required" }),
    password: zod_1.z.string().min(1, { message: "Password is required" }),
});
