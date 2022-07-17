import { Credential } from "@prisma/client";
import prismaClient from "../config/database.js";

export type CredentialCreationData = Omit<Credential, "id">;
export type RequestCredentialData = Omit<Credential, "id" | "userId">;

async function findByUserIdAndTitle(userId: number, title: string) {
    const credential = await prismaClient.credential.findUnique(
        {
            where: {
                title_userId: {
                    userId,
                    title
                }
            }
        }
    );

    return credential;
};

async function selectAllUserCredetials(userId: number) {
    const credentials = await prismaClient.credential.findMany({
        where: {
            userId
        }
    });

    return credentials;
}

async function insert(credentialCreationData: CredentialCreationData) {
    await prismaClient.credential.create({ data: credentialCreationData });
};

const credentialRepository = {
    findByUserIdAndTitle,
    selectAllUserCredetials,
    insert
};

export default credentialRepository;