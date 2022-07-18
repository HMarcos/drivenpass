import dotenv from "dotenv";

dotenv.config();
const env = process.env;

export const MIN_SIGNUP_PASSWORD_LENGTH = 10;
export const BCRYPT_SECRET_KEY = +env.BCRYPT_SECRET_KEY || 10;
export const JWT_SECRET_KEY = env.JWT_SECRET_KEY || "MY_JWT_SECRET_KEY";
export const CRYPTR_SECRET_KEY = env.CRYPTR_SECRET_KEY || "MY_CRYPTR_SECRET_KEY";
export const MAX_LENGTH_OF_SECURE_NOTE_TITLE = 50;
export const MAX_LENGTH_OF_SECURE_NOTE = 1000;
export const CARD_TYPES = ['credito', 'debito', 'ambos'];
export const CARD_EXPIRATION_DATE_PATTERN = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;