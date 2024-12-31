import { fa, faker } from "@faker-js/faker";
import prisma from "../client";
import { hashPassword } from "../../app/helpers/helper";

const userSeeder = async () => {
    console.log("Users seeding ...");
    for (let i = 0; i < 50; i++) {
        const email = faker.internet.email();
        const name = faker.person.fullName();
        const password = hashPassword('password');
        const dob = faker.date.birthdate().toISOString().split('T')[0];
        const gender = faker.person.sex() === "male" ? "male" : "female";
        const bio = faker.lorem.sentence();
        const phone = faker.phone.number();

        await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                name,
                email,
                password,
                profile: {
                    create: {
                        dob,
                        gender,
                        bio,
                        phone
                    },
                },
            },
        });
    }
    console.log("Users seeding successfully");
};

export default userSeeder;
