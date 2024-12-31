import { Router } from "express";
import authRoute from "./auth.route";
import profileRoute from "./profile.route";
import userRoute from "./user.route";
import mediaRoute from "./media.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/profile", profileRoute);
router.use("/media", mediaRoute);

export default router;
