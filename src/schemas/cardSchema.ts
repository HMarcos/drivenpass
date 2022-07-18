import joi from "joi";
import { RequestCardData } from "../repositories/cardRepository.js";
import { CARD_TYPES } from "../utils/constants.js";

const cardSchema = joi.object<RequestCardData>(
    {
        title: joi.string().required(),
        number: joi.string().required(),
        name: joi.string().required(),
        securityCode: joi.string().length(3).required(),
        expirationDate: joi.string().length(5).required(),
        password: joi.string().required(),
        isVirtual: joi.boolean().required(),
        type: joi.string().valid(...CARD_TYPES).required()
    }
);

export default cardSchema;