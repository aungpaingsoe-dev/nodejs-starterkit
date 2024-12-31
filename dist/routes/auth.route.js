"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../app/controllers/auth.controller"));
const async_handler_1 = require("../app/middlewares/handlers/async.handler");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.default();
router.post("/sign-in", [
    (0, async_handler_1.asyncHandler)((req, res) => authController.signIn(req, res)),
]);
router.post("/sign-up", [
    (0, async_handler_1.asyncHandler)((req, res) => authController.signUp(req, res)),
]);
exports.default = router;
