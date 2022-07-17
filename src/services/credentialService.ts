import { Credential, User } from "@prisma/client";
import credentialRepository, { RequestCredentialData, CredentialCreationData } from "../repositories/credentialRepository.js";
import AppError from "../utils/appError.js";
import encryptionUtils from "../utils/encryptionUtils.js";

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
    const userCredentials = await credentialRepository.findAllUserCredetials(userId);
    const formattedUserCredentials = decryptCredentialPasswords(userCredentials);
    return formattedUserCredentials;
};

async function getCredentialById(credentialId: number, userId: number) {
    const credential = await findCredentialOrFail(credentialId);
    checkIfCredentionBelongsToUser(credential, userId);

    const decryptedPassword = encryptionUtils.decryptWithCryptr(credential.password);
    const formattedCredential: Credential = {
        ...credential,
        password: decryptedPassword,
    };

    return formattedCredential;
};

async function findCredentialOrFail(credentialId: number) {
    const credential = await credentialRepository.findById(credentialId);
    if (!credential) {
        throw new AppError(404, "Credential not found.");
    };

    return credential;
};

function checkIfCredentionBelongsToUser(credential: Credential, userId: number) {
    const credentialBelongsToTheUser = credential.userId === userId;
    if (!credentialBelongsToTheUser) {
        throw new AppError(403, "Credential does not belong to the user.");
    };
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
    getAllUserCredentials,
    getCredentialById,
};

export default credentialService;