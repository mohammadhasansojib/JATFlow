import { prisma } from "../../lib/prisma.js";
import { UserRegistrationPayload } from "./auth.interface.js";


class AuthRepo {

    async createUserIntoDB(payload: UserRegistrationPayload) {
        const email = payload.email;
        const password = payload.password;

        const createdUser = await prisma.user.create({
            data: {
                email,
                password,
            },
            omit: {
                password: true,
            }
        })

        return createdUser;
    }

    async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    }

}

export const authRepo = new AuthRepo();