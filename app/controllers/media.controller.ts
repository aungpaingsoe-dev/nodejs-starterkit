import { Request, Response } from "express";
import { upload } from "../helpers/media-upload";
import { successResponse } from "../helpers/response";
import { BadRequestException } from "../helpers/exceptions";

class MediaController {
    async upload(req: any, res: Response) {
        let fileInfo = null;
        if (req.files && req.files.length !== 0) {
            const file = req.files[0];
            fileInfo = upload(file);
            return successResponse(res, "File upload successfully", fileInfo);
        }
        throw new BadRequestException("File not uploaded");
    }
}

export default MediaController;
