import { User } from "@prisma/client";
import { Request, Response } from "express";
import { RequestSecureNoteData } from "../repositories/secureNoteRepository.js";
import logging from "../utils/logging.js";
import AppError from "../utils/appError.js";
import secureNoteService from "../services/secureNoteService.js";

export async function setSecureNote(req: Request, res: Response) {
    const secureNoteData = req.body as RequestSecureNoteData;
    const user = res.locals.user as User;

    await secureNoteService.registerSecureNote(secureNoteData, user);

    console.log(logging.info('Secure note registered successfully.'));
    res.sendStatus(201);
};

export async function getSecureNotes(req: Request, res: Response) {
    const user = res.locals.user as User;
    const userSecureNotes = await secureNoteService.getAllUserSecureNotes(user.id);
    console.log(logging.info('Secure notes retrieved successfully.'));
    res.status(200).send(userSecureNotes);
};

export async function getSecureNoteById(req: Request, res: Response) {
    const secureNoteId = Number(req.params.id);
    if (isNaN(secureNoteId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    const secureNote = await secureNoteService.getSecureNoteById(secureNoteId, user.id);
    console.log(logging.info('Secure note retrieved successfully.'));
    res.status(200).send(secureNote);
};

export async function deleteSecureNote(req: Request, res: Response) {
    const secureNoteId = Number(req.params.id);
    if (isNaN(secureNoteId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    await secureNoteService.deleteSecureNoteById(secureNoteId, user.id);
    console.log(logging.info('SecureNote deleted successfully.'));
    res.sendStatus(200);
};