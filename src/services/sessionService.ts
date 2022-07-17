import sessionRepository from "../repositories/sessionRepository.js";
import { SessionCreationData } from "../repositories/sessionRepository.js";

async function register(session: SessionCreationData) {
    const sessionId = await sessionRepository.insert(session);
    return sessionId;
};

const sessionService = {
    register
};

export default sessionService;