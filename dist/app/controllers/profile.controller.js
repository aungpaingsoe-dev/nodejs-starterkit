"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../../prisma/client"));
const response_1 = require("../helpers/response");
const validator_1 = require("../helpers/validator");
const profile_schema_1 = require("../schemas/profile.schema");
const exceptions_1 = require("../helpers/exceptions");
const helper_1 = require("../helpers/helper");
const media_upload_1 = require("../helpers/media-upload");
class ProfileController {
    async me(req, res) {
        const { id } = req.user;
        const userInformation = await client_1.default.user.findFirst({
            where: {
                id,
            },
            include: {
                profile: true
            },
        });
        return (0, response_1.successResponse)(res, "Profile information successfully", userInformation);
    }
    async update(req, res) {
        const { data, error, success } = await (0, validator_1.validater)(profile_schema_1.profileUpdateSchema, req.body);
        if (!success) {
            throw new exceptions_1.ValidationException("Failed to profile update", error);
        }
        const authUser = req.user;
        const { name, username, email, phone, dob, bio, gender } = data;
        let fileInfo = null;
        if (req.files && req.files.length !== 0) {
            const file = req.files[0];
            fileInfo = (0, media_upload_1.upload)(file, "avatars");
        }
        const updateProfile = await client_1.default.user.update({
            where: {
                id: authUser.id
            },
            data: {
                name: name && authUser.name,
                username: username && authUser.username,
                email: email && authUser.email,
                profile: {
                    update: {
                        dob,
                        phone,
                        bio,
                        gender
                    }
                }
            }
        });
        return (0, response_1.successResponse)(res, "Profile update successfully", updateProfile);
    }
    async changePassword(req, res) {
        const { data, error, success } = await (0, validator_1.validater)(profile_schema_1.changePasswordSchema, req.body);
        if (!success) {
            throw new exceptions_1.ValidationException("Failed to update password", error);
        }
        const authUser = req.user;
        const { oldPassword, newPassword, newPasswordConfirm } = data;
        const updatePassword = await client_1.default.user.update({
            where: { id: authUser.id },
            data: {
                password: (0, helper_1.hashPassword)(newPassword),
            }
        });
        return (0, response_1.successResponse)(res, "Change password successfully", updatePassword);
    }
}
exports.default = ProfileController;
