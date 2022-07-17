import jwt from "jsonwebtoken";

import { SessionCreationData } from "../repositories/sessionRepository.js";
import { LoginData, UserCreationData } from "../repositories/userRepository.js";
import AppError from "../utils/appError.js";
import { JWT_SECRET_KEY } from "../utils/constants.js";
import encryptionUtils from "../utils/encryptionUtils.js";
import sessionService from "./sessionService.js";
import userService from "./userService.js";

async function signUp(user: UserCreationData) {
    const existingUser = await userService.getByEmail(user.email);
    if (existingUser) {
        throw new AppError(409, 'E-mail already registered.');
    };

    const encryptedPassword = encryptionUtils.encryptWithBcrypt(user.password);
    const newUser: UserCreationData = {
        ...user,
        password: encryptedPassword
    }

    await userService.register(newUser);
};

async function signIn(login: LoginData) {
    const user = await userService.getByEmail(login.email);

    if (!user || !encryptionUtils.validatePassword(login.password, user.password)) {
        throw new AppError(401, "Email or password is incorrect!");
    };

    const sessionData: SessionCreationData = { userId: user.id };
    const sessionId = await sessionService.register(sessionData);
    const token = generateToken(sessionId);

    return token;

};

function generateToken(sessionId: number) {
    const data = { sessionId };
    const secret_key = JWT_SECRET_KEY;

    const token = jwt.sign(data, secret_key);
    return token;
};

const authService = {
    signUp,
    signIn
};

export default authService;