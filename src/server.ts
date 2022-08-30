import "express-async-errors"
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import { AppError } from "./errors/AppError";

const app = express();
const port = 3000;

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        })
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server error: ${err.message}`,
    })
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
});