import dotenv from 'dotenv'
dotenv.config();

export const config = {
    DATABASE_URL: process.env.DATABASE_URL!,
    PORT: process.env.PORT!,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS!,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    ACCESS_TOKEN_EXPIRE: Number(process.env.ACCESS_TOKEN_EXPIRE!),
}