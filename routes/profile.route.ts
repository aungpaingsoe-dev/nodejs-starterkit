import passport from "passport";
import { Router, Request, Response } from "express";
import ProfileController from "../app/controllers/profile.controller";
import { asyncHandler } from "../app/middlewares/handlers/async.handler";

const router = Router();
const profileController = new ProfileController();

router.get("/me", [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    await profileController.me(req, res);
  }),
]);

router.post("/update", [
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    await profileController.update(req, res);
  }),
]);

export default router;
