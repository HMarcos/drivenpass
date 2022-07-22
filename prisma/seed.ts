import prismaClient from "../src/config/database.js";
import { admin_user_encrypted } from "../tests/factories/userFactory.js";

// create admin user por default!
async function main() {
    await prismaClient.user.upsert({
        where: { email: admin_user_encrypted.email },
        update: {},
        create: {
            email: admin_user_encrypted.email,
            password: admin_user_encrypted.password
        }
    });
};

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prismaClient.$disconnect();
})