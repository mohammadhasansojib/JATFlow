import bcrypt from "bcryptjs";
import { AuthorizationError, ConflictError, NotFoundError } from "../../utils/errorFormats.js";
import { UserLoginPayload, UserRegistrationPayload } from "./auth.interface.js"
import { authRepo } from "./auth.repository.js"
import { config } from "../../config/index.js";
import { createAccessToken } from "../../utils/jwt.js";


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

const loginUser = async (payload: UserLoginPayload) => {
    const {email, password} = payload;

    const user = await authRepo.getUserByEmail(email);
    if (!user) {
        throw new NotFoundError("user not found");
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
        throw new AuthorizationError("invalid password");
    }

    const accessTokenPayload = {
        id: user.id,
        email: user.email,
    };
    const accessToken = createAccessToken(accessTokenPayload);

    return {
        accessToken,
    };
}



export const authService = {
    createUser,
    loginUser,
}