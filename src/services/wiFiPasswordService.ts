import { WiFiPassword, User } from "@prisma/client";
import wiFiPasswordRepository, { RequestWiFiPasswordData, WiFiPasswordCreationData } from "../repositories/wiFiPasswordRepository.js";
import AppError from "../utils/appError.js";
import encryptionUtils from "../utils/encryptionUtils.js";

async function registerWiFiPassword(wiFiPasswordData: RequestWiFiPasswordData, user: User) {
    const encryptedPassword = encryptionUtils.encryptWithCryptr(wiFiPasswordData.password);
    const wiFiPasswordCreationData: WiFiPasswordCreationData = {
        ...wiFiPasswordData,
        password: encryptedPassword,
        userId: user.id
    };
    await wiFiPasswordRepository.insert(wiFiPasswordCreationData);
};

async function getAllUserWiFiPasswords(userId: number) {
    const userWiFiPasswords = await wiFiPasswordRepository.findAllUserWiFiPasswords(userId);
    const formattedUserWiFiPasswords = decryptWiFiPasswordPasswords(userWiFiPasswords);
    return formattedUserWiFiPasswords;
};

async function getWiFiPasswordById(wiFiPasswordId: number, userId: number) {
    const wiFiPassword = await findWiFiPasswordOrFail(wiFiPasswordId);
    checkIfWiFiPasswordBelongsToUser(wiFiPassword, userId);

    const decryptedPassword = encryptionUtils.decryptWithCryptr(wiFiPassword.password);
    const formattedWiFiPassword: WiFiPassword = {
        ...wiFiPassword,
        password: decryptedPassword,
    };

    return formattedWiFiPassword;
};

async function deleteWiFiPasswordById(wiFiPasswordId: number, userId: number) {
    const wiFiPassword = await findWiFiPasswordOrFail(wiFiPasswordId);
    checkIfWiFiPasswordBelongsToUser(wiFiPassword, userId);

    await wiFiPasswordRepository.deleteById(wiFiPasswordId);
};

async function findWiFiPasswordOrFail(wiFiPasswordId: number) {
    const wiFiPassword = await wiFiPasswordRepository.findById(wiFiPasswordId);
    if (!wiFiPassword) {
        throw new AppError(404, "WiFiPassword not found.");
    };

    return wiFiPassword;
};

function checkIfWiFiPasswordBelongsToUser(wiFiPassword: WiFiPassword, userId: number) {
    const wiFiPasswordBelongsToTheUser = wiFiPassword.userId === userId;
    if (!wiFiPasswordBelongsToTheUser) {
        throw new AppError(403, "WiFiPassword does not belong to the user.");
    };
};

function decryptWiFiPasswordPasswords(wiFiPasswords: WiFiPassword[]) {
    return wiFiPasswords.map((wiFiPassword) => {
        return {
            ...wiFiPassword,
            password: encryptionUtils.decryptWithCryptr(wiFiPassword.password),
        } as WiFiPassword;
    });
};

const wiFiPasswordService = {
    registerWiFiPassword,
    getAllUserWiFiPasswords,
    getWiFiPasswordById,
    deleteWiFiPasswordById
};

export default wiFiPasswordService;