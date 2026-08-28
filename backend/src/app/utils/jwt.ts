import jwt from "jsonwebtoken"
import { config } from "../config/index.js"

interface IAccessTokenPayload {
    id: string
    email: string
}

export const createAccessToken = (accessTokenPayload: IAccessTokenPayload) => {

    const accessToken = jwt.sign(
        accessTokenPayload,
        config.ACCESS_TOKEN_SECRET,
        {expiresIn: config.ACCESS_TOKEN_EXPIRE},
    );

    return accessToken;
}