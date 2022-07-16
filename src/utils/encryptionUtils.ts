import bcrypt from "bcrypt";
import { BCRYPT_SECRET_KEY } from "./constants.js";

function encryptWithBcrypt(data: string) {
    const encryptedData = bcrypt.hashSync(data, BCRYPT_SECRET_KEY);
    return encryptedData;
}

const encryptionUtils = {
    encryptWithBcrypt,
};

export default encryptionUtils;