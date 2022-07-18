import { User } from "@prisma/client";
import { Request, Response } from "express";
import { RequestCardData } from "../repositories/cardRepository.js";
import cardService from "../services/cardService.js";
import logging from "../utils/logging.js";
import AppError from "../utils/appError.js";

export async function setCard(req: Request, res: Response) {
    const cardData = req.body as RequestCardData;
    const user = res.locals.user as User;

    await cardService.registerCard(cardData, user);

    console.log(logging.info('Card registered successfully.'));
    res.sendStatus(201);
};

export async function getCards(req: Request, res: Response) {
    const user = res.locals.user as User;
    const userCards = await cardService.getAllUserCards(user.id);
    console.log(logging.info('Cards retrieved successfully.'));
    res.status(200).send(userCards);
};

export async function getCardById(req: Request, res: Response) {
    const cardId = Number(req.params.id);
    if (isNaN(cardId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    const card = await cardService.getCardById(cardId, user.id);
    console.log(logging.info('Card retrieved successfully.'));
    res.status(200).send(card);
};

export async function deleteCard(req: Request, res: Response) {
    const cardId = Number(req.params.id);
    if (isNaN(cardId)) {
        throw new AppError(422, "The id must be a number.");
    };

    const user = res.locals.user as User;

    await cardService.deleteCardById(cardId, user.id);
    console.log(logging.info('Card deleted successfully.'));
    res.sendStatus(200);
};