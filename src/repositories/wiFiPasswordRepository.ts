import { WiFiPassword } from "@prisma/client";
import prismaClient from "../config/database.js";

export type WiFiPasswordCreationData = Omit<WiFiPassword, "id">;
export type RequestWiFiPasswordData = Omit<WiFiPassword, "id" | "userId">;


async function findAllUserWiFiPasswords(userId: number) {
    const wiFiPasswords = await prismaClient.wiFiPassword.findMany({
        where: {
            userId
        }
    });

    return wiFiPasswords;
};

async function findById(wiFiPasswordId: number) {
    const wiFiPassword = await prismaClient.wiFiPassword.findUnique({
        where: {
            id: wiFiPasswordId,
        }
    });

    return wiFiPassword;
}

async function insert(wiFiPasswordCreationData: WiFiPasswordCreationData) {
    await prismaClient.wiFiPassword.create({ data: wiFiPasswordCreationData });
};

async function deleteById(wiFiPasswordId: number) {
    await prismaClient.wiFiPassword.delete({
        where: {
            id: wiFiPasswordId,
        }
    });   
}

const wiFiPasswordRepository = {
    findAllUserWiFiPasswords,
    findById,
    insert,
    deleteById
};

export default wiFiPasswordRepository;