"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../helpers/response");
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    userService;
    constructor() {
        this.userService = new user_service_1.default();
    }
    async findAll(req, res) {
        const users = await this.userService.findAll(req.user);
        return (0, response_1.successResponse)(res, "User list successfully", users);
    }
    async findOne(req, res) {
        const { id } = req.params;
        const user = await this.userService.findOne(+id, req.user);
        return (0, response_1.successResponse)(res, "Contact detail successfully", user);
    }
}
exports.default = UserController;
