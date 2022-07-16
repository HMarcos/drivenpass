import joi from "joi";
import { UserCreationData } from "../repositories/userRepository.js";
import { MIN_SIGNUP_PASSWORD_LENGTH } from "../utils/constants.js";

const signUpSchema = joi.object<UserCreationData>({
    email: joi.string().email().required(),
    password: joi.string().min(MIN_SIGNUP_PASSWORD_LENGTH).required()
});

export default signUpSchema;
