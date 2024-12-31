"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = async (from, to, subject, text, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    });
    console.log("Message sent: %s", info.messageId);
};
exports.sendMail = sendMail;
