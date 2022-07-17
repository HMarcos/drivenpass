import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import { BCRYPT_SECRET_KEY, CRYPTR_SECRET_KEY } from "./constants.js";

function encryptWithBcrypt(data: string) {
    const encryptedData = bcrypt.hashSync(data, BCRYPT_SECRET_KEY);
    return encryptedData;
};

function validatePassword(password: string, encryptedPassword: string) {
    return bcrypt.compareSync(password, encryptedPassword);
};

function encryptWithCryptr(data: string) {
    const cryptr = new Cryptr(CRYPTR_SECRET_KEY);
    const encryptedData = cryptr.encrypt(data);
    return encryptedData;
}

function decryptWithCryptr(encryptedData: string) {
    const cryptr = new Cryptr(CRYPTR_SECRET_KEY);
    const decryptedData = cryptr.decrypt(encryptedData);
    return decryptedData;
}

const encryptionUtils = {
    encryptWithBcrypt,
    validatePassword,
    encryptWithCryptr,
    decryptWithCryptr
};

export default encryptionUtils;