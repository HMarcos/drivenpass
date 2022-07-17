import { User } from "@prisma/client";
import { Request, Response } from "express";
import { RequestCredentialData } from "../repositories/credentialRepository.js";
import credentialService from "../services/credentialService.js";
import logging from "../utils/logging.js";
import AppError from "../utils/appError.js";

export async function setCredential(req: Request, res: Response) {
    const credentialData = req.body as RequestCredentialData;
    const user = res.locals.user as User;

    await credentialService.registerCredential(credentialData, user);

    console.log(logging.info('Credential registered successfully.'));
    res.sendStatus(201);
};

export async function getCredentials(req: Request, res: Response) {
    const user = res.locals.user as User;
    const userCredentials = await credentialService.getAllUserCredentials(user.id);
    console.log(logging.info('Credentials retrieved successfully.'));
    res.status(200).send(userCredentials);
};

export async function getCredentialById(req: Request, res: Response) {
    const credentialId = Number(req.params.id);
    if (isNaN(credentialId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    const credential = await credentialService.getCredentialById(credentialId, user.id);
    console.log(logging.info('Credential retrieved successfully.'));
    res.status(200).send(credential);
};

export async function deleteCredential(req: Request, res: Response) {
    const credentialId = Number(req.params.id);
    if (isNaN(credentialId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    await credentialService.deleteCredentialById(credentialId, user.id);
    console.log(logging.info('Credential deleted successfully.'));
    res.sendStatus(200);
};