import { Request, Response } from "express";
import { ReadAllLocacoesUseCase } from "./ReadAllLocacoesUseCase"

export class ReadAllLocacoesController {
    async handle(req: Request, res: Response) {

        const readAllLocacoesUseCase = new ReadAllLocacoesUseCase();

        const result = await readAllLocacoesUseCase.execute();

        return res.status(201).json(result);
    }
}