import userRepository from "../repositories/userRepository";

async function getByEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    return user;
}

const userService = {
    getByEmail
}

export default userService;