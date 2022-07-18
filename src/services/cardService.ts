import { Card, User } from "@prisma/client";
import cardRepository, { RequestCardData, CardCreationData } from "../repositories/cardRepository.js";
import AppError from "../utils/appError.js";
import encryptionUtils from "../utils/encryptionUtils.js";

async function registerCard(cardData: RequestCardData, user: User) {
    const existingCard = await cardRepository.findByUserIdAndTitle(user.id, cardData.title);
    if (existingCard) {
        throw new AppError(409, "Card already registered.");
    };

    const encryptedPassword = encryptionUtils.encryptWithCryptr(cardData.password);
    const encryptedSecurityCode = encryptionUtils.encryptWithCryptr(cardData.securityCode);
    const cardCreationData: CardCreationData = {
        ...cardData,
        password: encryptedPassword,
        securityCode: encryptedSecurityCode,
        userId: user.id
    };

    await cardRepository.insert(cardCreationData);
};

async function getAllUserCards(userId: number) {
    const userCards = await cardRepository.findAllUserCards(userId);
    const formattedUserCards = decryptCardPasswordsAndSecurityCodes(userCards);
    return formattedUserCards;
};

async function getCardById(cardId: number, userId: number) {
    const card = await findCardOrFail(cardId);
    checkIfCardBelongsToUser(card, userId);

    const decryptedPassword = encryptionUtils.decryptWithCryptr(card.password);
    const decryptedSecurityCode = encryptionUtils.decryptWithCryptr(card.securityCode);
    const formattedCard: Card = {
        ...card,
        password: decryptedPassword,
        securityCode: decryptedSecurityCode,
    };

    return formattedCard;
};

async function deleteCardById(cardId: number, userId: number) {
    const card = await findCardOrFail(cardId);
    checkIfCardBelongsToUser(card, userId);

    await cardRepository.deleteById(cardId);
};

async function findCardOrFail(cardId: number) {
    const card = await cardRepository.findById(cardId);
    if (!card) {
        throw new AppError(404, "Card not found.");
    };

    return card;
};

function checkIfCardBelongsToUser(card: Card, userId: number) {
    const cardBelongsToTheUser = card.userId === userId;
    if (!cardBelongsToTheUser) {
        throw new AppError(403, "Card does not belong to the user.");
    };
};

function decryptCardPasswordsAndSecurityCodes(cards: Card[]) {
    return cards.map((card) => {
        return {
            ...card,
            password: encryptionUtils.decryptWithCryptr(card.password),
            securityCode: encryptionUtils.decryptWithCryptr(card.securityCode)
        } as Card;
    });
};

const cardService = {
    registerCard,
    getAllUserCards,
    getCardById,
    deleteCardById
};

export default cardService;