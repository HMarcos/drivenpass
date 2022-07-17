import { User } from "@prisma/client";
import { Request, Response } from "express";
import { RequestCredentialData } from "../repositories/credentialRepository.js";
import credentialService from "../services/credentialService.js";
import logging from "../utils/logging.js";

export async function setCredential(req: Request, res: Response) {
    const credentialData = req.body as RequestCredentialData;
    const user = res.locals.user as User;

    await credentialService.registerCredential(credentialData, user);

    console.log(logging.info('Credential registered successfully.'));
    res.sendStatus(201);
}