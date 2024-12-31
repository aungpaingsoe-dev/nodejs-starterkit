"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../helpers/helper");
const response_1 = require("../helpers/response");
const validator_1 = require("../helpers/validator");
const auth_schema_1 = require("../schemas/auth.schema");
const exceptions_1 = require("../helpers/exceptions");
const helper_2 = require("../helpers/helper");
const client_1 = __importDefault(require("../../prisma/client"));
class AuthController {
    async signUp(req, res) {
        const { data, error, success } = await (0, validator_1.validater)(auth_schema_1.signUpSchema, req.body);
        if (!success) {
            throw new exceptions_1.ValidationException("Invalid Credential", error);
        }
        const username = (0, helper_1.generateUsername)(data.name);
        const newUser = await client_1.default.user.create({
            data: {
                username,
                email: data.email,
                name: data.name,
                password: (0, helper_2.hashPassword)(data.password),
                profile: {
                    create: {
                        dob: null,
                        gender: null,
                        bio: null,
                    },
                },
            },
        });
        return (0, response_1.successResponse)(res, "User registration successfully", newUser);
    }
    async signIn(req, res) {
        const { data, error, success } = await (0, validator_1.validater)(auth_schema_1.signInSchema, req.body);
        if (!success) {
            throw new exceptions_1.ValidationException("Unauthorized", error);
        }
        const user = await client_1.default.user.findFirst({
            where: {
                OR: [{ email: data.username }, { username: data.username }],
            },
            include: {
                profile: true
            }
        });
        if (!user) {
            throw new exceptions_1.UnauthorizedException();
        }
        const passwordCompress = (0, helper_1.comparePassword)(data.password, user.password);
        if (!passwordCompress) {
            throw new exceptions_1.UnauthorizedException();
        }
        const token = (0, helper_1.generateToken)(user, "30d");
        return (0, response_1.successResponse)(res, "User sign in successfully", {
            user,
            token,
        });
    }
}
exports.default = AuthController;
