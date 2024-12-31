import { Request, Response, Router } from "express";
import { asyncHandler } from "../app/middlewares/handlers/async.handler";
import MediaController from "../app/controllers/media.controller";

const router = Router();
const mediaController = new MediaController();

router.post("/upload", [
    asyncHandler(async (req: Request, res: Response) =>
        await mediaController.upload(req, res)
    ),
]);

export default router;
