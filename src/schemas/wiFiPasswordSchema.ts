import joi from "joi";
import { RequestWiFiPasswordData } from "../repositories/wiFiPasswordRepository.js";

const wiFiPasswordSchema = joi.object<RequestWiFiPasswordData>(
    {
        title: joi.string().required(),
        net: joi.string().required(),
        password: joi.string().required()
    }
);

export default wiFiPasswordSchema;