import { UserCreationData } from "../repositories/userRepository.js";
import AppError from "../utils/appError.js";
import userService from "./userService.js";

async function signUp(user: UserCreationData) {
    const existingUser = await userService.getByEmail(user.email);
    if (existingUser) {
        throw new AppError(409, "E-mail already registered.");
    }
};

const authService = {
    signUp
};

export default authService;