import { User } from "@prisma/client";
import { Request, Response } from "express";
import { RequestWiFiPasswordData } from "../repositories/wiFiPasswordRepository.js";
import wiFiPasswordService from "../services/wiFiPasswordService.js";
import logging from "../utils/logging.js";
import AppError from "../utils/appError.js";

export async function setWiFiPassword(req: Request, res: Response) {
    const wiFiPasswordData = req.body as RequestWiFiPasswordData;
    const user = res.locals.user as User;

    await wiFiPasswordService.registerWiFiPassword(wiFiPasswordData, user);

    console.log(logging.info('Wi-Fi Password registered successfully.'));
    res.sendStatus(201);
};

export async function getWiFiPasswords(req: Request, res: Response) {
    const user = res.locals.user as User;
    const userWiFiPasswords = await wiFiPasswordService.getAllUserWiFiPasswords(user.id);
    console.log(logging.info('Wi-Fi Passwords retrieved successfully.'));
    res.status(200).send(userWiFiPasswords);
};

export async function getWiFiPasswordById(req: Request, res: Response) {
    const wiFiPasswordId = Number(req.params.id);
    if (isNaN(wiFiPasswordId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    const wiFiPassword = await wiFiPasswordService.getWiFiPasswordById(wiFiPasswordId, user.id);
    console.log(logging.info('Wi-Fi Password retrieved successfully.'));
    res.status(200).send(wiFiPassword);
};

export async function deleteWiFiPassword(req: Request, res: Response) {
    const wiFiPasswordId = Number(req.params.id);
    if (isNaN(wiFiPasswordId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    await wiFiPasswordService.deleteWiFiPasswordById(wiFiPasswordId, user.id);
    console.log(logging.info('Wi-Fi Password deleted successfully.'));
    res.sendStatus(200);
};