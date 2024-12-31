"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../app/controllers/user.controller"));
const passport_1 = __importDefault(require("passport"));
const async_handler_1 = require("../app/middlewares/handlers/async.handler");
const router = (0, express_1.Router)();
const userController = new user_controller_1.default();
router
    .route("/")
    .get([
    passport_1.default.authenticate("jwt", { session: false }),
    (0, async_handler_1.asyncHandler)(async (req, res) => userController.findAll(req, res))
]);
router
    .route("/:id")
    .get([
    passport_1.default.authenticate("jwt", { session: false }),
    (0, async_handler_1.asyncHandler)(async (req, res) => userController.findOne(req, res))
]);
exports.default = router;
