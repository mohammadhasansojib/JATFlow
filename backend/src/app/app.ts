import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { sendResponse } from "./utils/sendResponse.js";
import { AppError } from "./utils/errorFormats.js";
import authRouters from "./module/auth/auth.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/api/auth", authRouters);

app.get("/", (req: Request, res: Response) => {
    res.send("Server Running...");
})


// 404 route handler
app.use((req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
        success: false,
        message: "route not found",
        statusCode: 404,
        data: null,
    });
})

// global error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    sendResponse(res, {
        success: false,
        message,
        statusCode,
        data: null,
    });
})

export default app;