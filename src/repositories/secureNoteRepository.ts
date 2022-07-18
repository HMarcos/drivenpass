import { SecureNote } from "@prisma/client";
import prismaClient from "../config/database.js";

export type SecureNoteCreationData = Omit<SecureNote, "id">;
export type RequestSecureNoteData = Omit<SecureNote, "id" | "userId">;

async function findByUserIdAndTitle(userId: number, title: string) {
    const secureNote = await prismaClient.secureNote.findUnique(
        {
            where: {
                title_userId: {
                    userId,
                    title
                }
            }
        }
    );

    return secureNote;
};

async function findAllUserSecureNotes(userId: number) {
    const secureNotes = await prismaClient.secureNote.findMany({
        where: {
            userId
        }
    });

    return secureNotes;
};

async function findById(secureNoteId: number) {
    const secureNote = await prismaClient.secureNote.findUnique({
        where: {
            id: secureNoteId,
        }
    });

    return secureNote;
};

async function insert(secureNoteCreationData: SecureNoteCreationData) {
    await prismaClient.secureNote.create({ data: secureNoteCreationData });
};

async function deleteById(secureNoteId: number) {
    await prismaClient.secureNote.delete({
        where: {
            id: secureNoteId,
        }
    });
};

const secureNoteRepository = {
    findByUserIdAndTitle,
    findAllUserSecureNotes,
    findById,
    insert,
    deleteById
};

export default secureNoteRepository;