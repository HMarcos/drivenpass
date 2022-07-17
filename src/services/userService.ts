import userRepository, { UserCreationData } from "../repositories/userRepository.js";

async function getByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    return user;
};

async function register(user: UserCreationData) {
    await userRepository.insert(user);
};

const userService = {
    getByEmail,
    register
};

export default userService;