import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { BadRequestException } from "./exceptions"; 

export const upload = (file: any) => {
    const maxFileSize = 5 * 1024 * 1024;
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
    ];

    // Validate file size
    if (file.size > maxFileSize) {
        throw new BadRequestException("File too large");
    }

    // Validate MIME type
    if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException("Invalid file type");
    }

    // Define upload path
    const uploadDir = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileExtension = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueName);

    // Save file to the uploads folder
    fs.writeFileSync(filePath, file.buffer);

    return {
        fileSize: file.size,
        fileMimeType: file.mimetype,
        fileName: uniqueName,
        filePath: filePath
    }
}