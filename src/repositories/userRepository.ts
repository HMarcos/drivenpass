import { User } from "@prisma/client";
import prismaClient from "../config/database.js";

export type UserCreationData = Omit<User,"id">;
export type LoginData = Omit<User,"id">;

async function findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    });

    return user;
}

const userRepository = {
    findByEmail
};

export default userRepository;