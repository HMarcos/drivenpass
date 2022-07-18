import joi from "joi";
import { RequestCardData } from "../repositories/cardRepository.js";
import { CARD_EXPIRATION_DATE_PATTERN, CARD_TYPES } from "../utils/constants.js";

const cardSchema = joi.object<RequestCardData>(
    {
        title: joi.string().required(),
        number: joi.string().required(),
        name: joi.string().required(),
        securityCode: joi.string().length(3).required(),
        password: joi.string().required(),
        expirationDate: joi.string().regex(CARD_EXPIRATION_DATE_PATTERN).required().messages({ "string.pattern.base": "Card expiration date must be on MM/YY format." }),
        isVirtual: joi.boolean().required(),
        type: joi.string().valid(...CARD_TYPES).required()
    }
);

export default cardSchema;