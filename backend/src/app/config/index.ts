import dotenv from 'dotenv'
dotenv.config();

export const config = {
    DATABASE_URL: process.env.DATABASE_URL!,
    PORT: process.env.PORT!,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS!,
}