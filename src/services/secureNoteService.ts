import { SecureNote, User } from "@prisma/client";
import secureNoteRepository, { RequestSecureNoteData, SecureNoteCreationData } from "../repositories/secureNoteRepository.js";
import AppError from "../utils/appError.js";

async function registerSecureNote(secureNoteData: RequestSecureNoteData, user: User) {
    const existingSecureNote = await secureNoteRepository.findByUserIdAndTitle(user.id, secureNoteData.title);
    if (existingSecureNote) {
        throw new AppError(409, "Secure Note already registered.");
    };

    const secureNoteCreationData: SecureNoteCreationData = {
        ...secureNoteData,
        userId: user.id
    };
    await secureNoteRepository.insert(secureNoteCreationData);
};

async function getAllUserSecureNotes(userId: number) {
    const userSecureNotes = await secureNoteRepository.findAllUserSecureNotes(userId);
    return userSecureNotes;
};

async function getSecureNoteById(secureNoteId: number, userId: number) {
    const secureNote = await findSecureNoteOrFail(secureNoteId);
    checkIfSecureNoteBelongsToUser(secureNote, userId);
    return secureNote;
};

async function deleteSecureNoteById(secureNoteId: number, userId: number) {
    const secureNote = await findSecureNoteOrFail(secureNoteId);
    checkIfSecureNoteBelongsToUser(secureNote, userId);

    await secureNoteRepository.deleteById(secureNoteId);
};

async function findSecureNoteOrFail(secureNoteId: number) {
    const secureNote = await secureNoteRepository.findById(secureNoteId);
    if (!secureNote) {
        throw new AppError(404, "Secure note not found.");
    };

    return secureNote;
};

function checkIfSecureNoteBelongsToUser(secureNote: SecureNote, userId: number) {
    const secureNoteBelongsToTheUser = secureNote.userId === userId;
    if (!secureNoteBelongsToTheUser) {
        throw new AppError(403, "Secure note does not belong to the user.");
    };
};


const secureNoteService = {
    registerSecureNote,
    getAllUserSecureNotes,
    getSecureNoteById,
    deleteSecureNoteById
};

export default secureNoteService;