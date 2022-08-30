import { Request, Response } from "express";
import { ReadAllUsuariosUseCase } from "./ReadAllUsuariosUseCase"

export class ReadAllUsuariosController {
    async handle(req: Request, res: Response) {

        const readAllUsuariosUseCase = new ReadAllUsuariosUseCase();

        const result = await readAllUsuariosUseCase.execute();

        return res.status(201).json(result);
    }
}