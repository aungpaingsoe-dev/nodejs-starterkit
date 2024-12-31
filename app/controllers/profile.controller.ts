import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { User } from "@prisma/client";
import { successResponse } from "../helpers/response";
import { validater } from "../helpers/validator";
import {
    ProfileUpdateInput,
    profileUpdateSchema
} from "../schemas/profile.schema";
import { ValidationException } from "../helpers/exceptions";

class ProfileController {
    async me(req: Request, res: Response) {
        const { id } = req.user as User;

        const userInformation = await prisma.user.findFirst({
            where: {
                id,
            },
            include: {
                profile: true
            },
        });

        return successResponse(
            res,
            "Profile information successfully",
            userInformation
        );
    }

    async update(req: any, res: Response) {
        const { data, error, success } = await validater(
            profileUpdateSchema,
            req.body
        );

        if (!success) {
            throw new ValidationException("Failed to profile update", error);
        }

        const authUser = req.user as User;
        const { name, email, phone, dob, bio, gender }: ProfileUpdateInput = data;

        const updateProfile = await prisma.user.update({
            where: {
                id: authUser.id
            },
            data: {
                name: name && authUser.name,
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
        })

        return successResponse(res, "Profile update successfully", updateProfile);
    }
}

export default ProfileController;
