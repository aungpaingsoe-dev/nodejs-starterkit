"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../prisma/client"));
class UserService {
    async findAll(currentUser) {
        return await client_1.default.user.findMany({
            where: {
                NOT: {
                    id: currentUser.id,
                },
            },
            orderBy: {
                id: "desc",
            },
            include: {
                profile: true
            },
        });
    }
    async findOne(id, currentUser) {
        return await client_1.default.user.findFirst({
            where: {
                id: id,
                NOT: {
                    id: currentUser.id
                }
            },
            orderBy: {
                id: "desc",
            },
        });
    }
}
exports.default = UserService;
