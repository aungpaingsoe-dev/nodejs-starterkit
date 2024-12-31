import dotenv from "dotenv";
import prisma from "../client";
import userSeeder from "./user.seeder";

dotenv.config();

const main = async () => {
    try {
        await userSeeder();
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

main();
