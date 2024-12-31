import {
  comparePassword,
  generateToken,
} from "../helpers/helper";
import { Request, Response } from "express";
import { successResponse } from "../helpers/response";
import { validater } from "../helpers/validator";
import {
  signInSchema,
  signUpSchema
} from "../schemas/auth.schema";
import {
  UnauthorizedException,
  ValidationException,
} from "../helpers/exceptions";
import { hashPassword } from "../helpers/helper";
import prisma from "../../prisma/client";
import UserService from "../services/user.service";

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async signUp(req: Request, res: Response) {
    const { data, error, success } = await validater(signUpSchema, req.body);

    console.log(data);

    if (!success) {
      throw new ValidationException("Invalid Credential", error);
    }

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashPassword(data.password),
        profile: {
          create: {
            dob: null,
            gender: null,
            bio: null,
          },
        },
      },
    });

    const user = await this.userService.findOne(newUser.id);
    return successResponse(res, "User registration successfully", user);
  }

  async signIn(req: Request, res: Response) {
    const { data, error, success } = await validater(signInSchema, req.body);

    if (!success) {
      throw new ValidationException("Unauthorized", error);
    }

    const user = await prisma.user.findFirst({
      where: {
        email: data.email
      },
      include: {
        profile: true
      }
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordCompress = comparePassword(data.password, user.password);

    if (!passwordCompress) {
      throw new UnauthorizedException();
    }

    const token: string = generateToken(user, "30d");

    return successResponse(res, "User sign in successfully", {
      user: await this.userService.findOne(user.id),
      token,
    });
  }
}

export default AuthController;
