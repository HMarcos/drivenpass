import joi from "joi";
import { RequestCredentialData } from "../repositories/credentialRepository.js";

const credentialSchema = joi.object<RequestCredentialData>(
    {
        title: joi.string().required(),
        url: joi.string().uri().required(),
        username: joi.string().required(),
        password: joi.string().required()
    }
);

export default credentialSchema;