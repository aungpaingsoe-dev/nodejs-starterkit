"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.generateOtpExpiredAt = exports.generateUsername = exports.decodeToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hashPassword = (password) => bcrypt_1.default.hashSync(password, 10);
exports.hashPassword = hashPassword;
const comparePassword = (password, hashPassword) => bcrypt_1.default.compareSync(password, hashPassword);
exports.comparePassword = comparePassword;
const generateToken = (user, expiresIn) => {
    return jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: expiresIn || "30d",
    });
};
exports.generateToken = generateToken;
const decodeToken = (token) => jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
exports.decodeToken = decodeToken;
const generateUsername = (name) => {
    return name
        .toLocaleLowerCase()
        .split(" ")
        .join("")
        .replace(/[^a-z0-9]/g, "");
};
exports.generateUsername = generateUsername;
const generateOtpExpiredAt = () => {
    const expiredAt = new Date();
    expiredAt.setMinutes(expiredAt.getMinutes() + 10);
    return expiredAt;
};
exports.generateOtpExpiredAt = generateOtpExpiredAt;
const generateOTP = () => {
    let digits = "123456789";
    let otp = "";
    let len = digits.length;
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * len)];
    }
    return otp;
};
exports.generateOTP = generateOTP;
