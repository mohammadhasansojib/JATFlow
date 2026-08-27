import bcrypt from "bcryptjs";
import { ConflictError } from "../../utils/errorFormats.js";
import { UserRegistrationPayload } from "./auth.interface.js"
import { authRepo } from "./auth.repository.js"
import { config } from "../../config/index.js";


const createUser = async (payload: UserRegistrationPayload) => {
    const {email, password} = payload;
    
    const user = await authRepo.getUserByEmail(email);
    if (user) {
        throw new ConflictError("user already exist with this email");
    }

    const hashPassword = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUNDS));

    const updatedPayload = {
        email,
        password: hashPassword,
    };

    const createdUser = await authRepo.createUserIntoDB(updatedPayload);

    return createdUser;
}



export const authService = {
    createUser,
}