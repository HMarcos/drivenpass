import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/constants.js";

export function generateToken(sessionId: number) {
    const data = { sessionId };
    const secret_key = JWT_SECRET_KEY;

    const token = jwt.sign(data, secret_key);
    return token;
};

export function getSesionIdByToken(token: string) {
    const secret_key = JWT_SECRET_KEY;
    const data = jwt.verify(token, secret_key) as { sessionId: number };
    return data.sessionId;
}