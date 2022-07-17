import dotenv from "dotenv";

dotenv.config();
const env = process.env;

export const MIN_SIGNUP_PASSWORD_LENGTH = 10;
export const BCRYPT_SECRET_KEY = +env.BCRYPT_SECRET_KEY || 10;
export const JWT_SECRET_KEY = env.JWT_SECRET_KEY || "MY_JWT_SECRET_KEY";
export const CRYPTR_SECRET_KEY = env.CRYPTR_SECRET_KEY || "MY_CRYPTR_SECRET_KEY";