import prisma from "../../prisma/client";
import { BadRequestException } from "../helpers/exceptions";
import { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";

class UserService {
    async findAll() {
        return await prisma.user.findMany({
            orderBy: {
                id: "desc",
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        phone: true,
                        dob: true,
                        bio: true,
                        gender: true
                    }
                }
            }
        });
    }

    async findOne(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
                profile: {
                    select: {
                        phone: true,
                        dob: true,
                        bio: true,
                        gender: true
                    }
                }
            }
        });

        if (!user) {
            throw new BadRequestException("User not found");
        }

        return user;
    }

    async create(createUserInput: CreateUserInput) {

        const { name, email, password, phone, dob, gender, bio } = createUserInput;

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                profile: {
                    create: {
                        dob,
                        phone,
                        gender,
                        bio
                    }
                }
            }
        });

        return this.findOne(user.id);
    }

    async update(id: number, updateUserInput: UpdateUserInput) {
        await this.findOne(id);

        await prisma.user.update({
            where: {
                id
            },
            data: updateUserInput
        });

        return this.findOne(id);
    }

    async destroy(id: number) {
        await this.findOne(id);
        await prisma.user.delete({ where: { id } });
    }
}

export default UserService;
