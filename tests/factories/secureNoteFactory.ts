import { faker } from "@faker-js/faker";

import prismaClient from "../../src/config/database.js";
import { RequestSecureNoteData } from "../../src/repositories/secureNoteRepository.js";

function createSecureNoteInfo() {
    return {
        title: faker.internet.domainWord(),
        note: faker.lorem.words(15)
    } as RequestSecureNoteData
};

const secureNoteFactory = {
    createSecureNoteInfo
};

export default secureNoteFactory;