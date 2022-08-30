import { Request, Response } from "express";
import { ReadAllFerramentasUseCase } from "./ReadAllFerramentasUseCase"

export class ReadAllFerramentasController {
    async handle(req: Request, res: Response) {

        const readAllFerramentasUseCase = new ReadAllFerramentasUseCase();

        const result = await readAllFerramentasUseCase.execute();

        return res.status(201).json(result);
    }
}