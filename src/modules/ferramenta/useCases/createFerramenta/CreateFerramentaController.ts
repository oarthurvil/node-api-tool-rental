import { Request, Response } from "express";
import { CreateFerramentaUseCase } from "./CreateFerramentaUseCase"

export class CreateFerramentaController {
    async handle(req: Request, res: Response) {
        const { nome, condicoes, localizacao, proprietarioId } = req.body;

        const createFerramentaUseCase = new CreateFerramentaUseCase();

        const result = await createFerramentaUseCase.execute({ nome, condicoes, localizacao, proprietarioId });

        return res.status(201).json(result);
    }
}