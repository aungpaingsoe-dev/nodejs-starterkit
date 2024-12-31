import { Request, Response } from "express";
import { successResponse } from "../helpers/response";
import UserService from "../services/user.service";
import { validater } from "../helpers/validator";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { ValidationException } from "../helpers/exceptions";
import prisma from "../../prisma/client";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll();
    return successResponse(res, "User list successfully", users);
  }

  async findOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userService.findOne(+id);
    return successResponse(res, "User detail successfully", user);
  }

  async create(req: Request, res: Response) {
    const { data, error, success } = await validater(createUserSchema, req.body);

    if (!success) {
      throw new ValidationException("User created failed", error);
    }

    const user = await this.userService.create(data);
    return successResponse(res, "User created successfully", user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    updateUserSchema
      .refine(
        async (args) => {
          if (!req.body.name) return true;
          const result = await prisma.user.findFirst({
            where: { email: args.email, NOT: { id: +id } },
          });
          return !result;
        },
        { message: "Email is already exist", path: ["email"] }
      )
      .refine(
        async (args) => {
          if (!req.body.email) return true;
          const result = await prisma.user.findFirst({
            where: { name: args.name, NOT: { id: +id } },
          });
          return !result;
        },
        { message: "Name is already exist", path: ["name"] }
      );

    const { data, error, success } = await validater(updateUserSchema, req.body);

    if (!success) {
      throw new ValidationException("User updated failed", error);
    }

    const user = await this.userService.update(+id, data);
    return successResponse(res, "User updated successfully", user);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    await this.userService.destroy(+id);
    return successResponse(res, "User deleted successfully");
  }
}

export default UserController;
