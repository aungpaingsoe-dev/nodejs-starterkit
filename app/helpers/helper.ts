import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

export const comparePassword = (password: string, hashPassword: string) =>
  bcrypt.compareSync(password, hashPassword);

export const generateToken = (user: any, expiresIn: string) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: expiresIn || "30d",
  });
};

export const decodeToken = (token: any) =>
  jwt.verify(token, process.env.JWT_SECRET as string);