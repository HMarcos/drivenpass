import joi from "joi";
import { RequestSecureNoteData } from "../repositories/secureNoteRepository.js";
import { MAX_LENGTH_OF_SECURE_NOTE, MAX_LENGTH_OF_SECURE_NOTE_TITLE } from "../utils/constants.js";

const secureNoteSchema = joi.object<RequestSecureNoteData>(
    {
        title: joi.string().max(MAX_LENGTH_OF_SECURE_NOTE_TITLE).required(),
        note: joi.string().max(MAX_LENGTH_OF_SECURE_NOTE).required(),
    }
);

export default secureNoteSchema;