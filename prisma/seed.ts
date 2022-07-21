import bcrypt from "bcrypt";

import prismaClient from "../src/config/database.js";
import { UserCreationData } from "../src/repositories/userRepository.js";
import { BCRYPT_SECRET_KEY } from "../src/utils/constants.js";
import { admin_user } from "../tests/factories/userFactory.js";

// create admin user por default!
async function main() {
    const hashedPassword = bcrypt.hashSync("admin", BCRYPT_SECRET_KEY);

    await prismaClient.user.upsert({
        where: { email: admin_user.email },
        update: {},
        create: {
            email: admin_user.email,
            password: admin_user.password
        }
    });
};

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prismaClient.$disconnect();
})