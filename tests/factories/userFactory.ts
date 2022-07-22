import bcrypt from "bcrypt";
import { UserCreationData } from "../../src/repositories/userRepository.js";
import { BCRYPT_SECRET_KEY } from "../../src/utils/constants.js";

export const admin_user: UserCreationData = {
    email: "admin@admin.com",
    password: "admin",
};

export const admin_user_encrypted: UserCreationData = {
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin", BCRYPT_SECRET_KEY),
}
