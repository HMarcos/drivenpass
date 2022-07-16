import dotenv from "dotenv";

dotenv.config();
const env = process.env;

export const MIN_SIGNUP_PASSWORD_LENGTH = 10;
export const BCRYPT_SECRET_KEY = env.BCRYPT_SECRET_KEY || 10;

