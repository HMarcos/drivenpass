import { Credential, User } from "@prisma/client";
import credentialRepository, { RequestCredentialData, CredentialCreationData } from "../repositories/credentialRepository.js";
import AppError from "../utils/appError.js";
import encryptionUtils from "../utils/encryptionUtils.js";
import logging from "../utils/logging.js";

async function registerCredential(credentialData: RequestCredentialData, user: User) {
    const existingCredential = await credentialRepository.findByUserIdAndTitle(user.id, credentialData.title);
    if (existingCredential) {
        throw new AppError(409, "Credential already registered.");
    };

    const encryptedPassword = encryptionUtils.encryptWithCryptr(credentialData.password);
    const credentialCreationData: CredentialCreationData = {
        ...credentialData,
        password: encryptedPassword,
        userId: user.id
    };
    await credentialRepository.insert(credentialCreationData);
};

async function getAllUserCredentials(userId: number) {
    const userCredentials = await credentialRepository.selectAllUserCredetials(userId);
    const formattedUserCredentials = decryptCredentialPasswords(userCredentials);
    return formattedUserCredentials;
};

function decryptCredentialPasswords(credentials: Credential[]) {
    return credentials.map((credential) => {
        return {
            ...credential,
            password: encryptionUtils.decryptWithCryptr(credential.password),
        } as Credential;
    });
};

const credentialService = {
    registerCredential,
    getAllUserCredentials
};

export default credentialService;