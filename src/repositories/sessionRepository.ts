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
}

const sessionRepository = {
    insert
};

export default sessionRepository;