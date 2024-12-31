"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const exceptions_1 = require("./exceptions");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const upload = (file, dirName) => {
    const maxFileSize = 5 * 1024 * 1024;
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
    ];
    // Validate file size
    if (file.size > maxFileSize) {
        throw new exceptions_1.BadRequestException("File too large");
    }
    // Validate MIME type
    if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new exceptions_1.BadRequestException("Invalid file type");
    }
    // Define upload path
    const uploadDir = path_1.default.join(__dirname, "../public/uploads");
    if (!fs_1.default.existsSync(uploadDir)) {
        fs_1.default.mkdirSync(uploadDir, { recursive: true });
    }
    const fileExtension = path_1.default.extname(file.originalname);
    const uniqueName = `${(0, uuid_1.v4)()}${fileExtension}`;
    const filePath = path_1.default.join(uploadDir, uniqueName);
    // Save file to the uploads folder
    fs_1.default.writeFileSync(filePath, file.buffer);
    return {
        fileSize: file.size,
        fileMimeType: file.mimetype,
        fileName: uniqueName,
        filePath: filePath
    };
};
exports.upload = upload;
