import { Card } from "@prisma/client";
import prismaClient from "../config/database.js";

export type CardCreationData = Omit<Card, "id">;
export type RequestCardData = Omit<Card, "id" | "userId">;

async function findByUserIdAndTitle(userId: number, title: string) {
    const card = await prismaClient.card.findUnique(
        {
            where: {
                title_userId: {
                    userId,
                    title
                }
            }
        }
    );

    return card;
};

async function findAllUserCards(userId: number) {
    const cards = await prismaClient.card.findMany({
        where: {
            userId
        }
    });

    return cards;
};

async function findById(cardId: number) {
    const card = await prismaClient.card.findUnique({
        where: {
            id: cardId,
        }
    });

    return card;
}

async function insert(cardCreationData: CardCreationData) {
    await prismaClient.card.create({ data: cardCreationData });
};

async function deleteById(cardId: number) {
    await prismaClient.card.delete({
        where: {
            id: cardId,
        }
    });   
}

const cardRepository = {
    findByUserIdAndTitle,
    findAllUserCards,
    findById,
    insert,
    deleteById
};

export default cardRepository;