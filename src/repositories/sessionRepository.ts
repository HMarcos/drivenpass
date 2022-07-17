import { Session } from "@prisma/client";
import prismaClient from "../config/database.js";

export type SessionCreationData = Omit<Session, "id">;

async function insert(sessionCreationData: SessionCreationData) {
    const result = await prismaClient.$queryRaw`
        INSERT INTO sessions ("userId")
        VALUES (${sessionCreationData.userId})
        RETURNING id;
    `;
    const sessionId: number = result[0].id;
    return sessionId;
};

async function findById(id: number) {
    const session = await prismaClient.session.findUnique({
        where: { id }
    });

    return session;
}

const sessionRepository = {
    insert,
    findById
};

export default sessionRepository;