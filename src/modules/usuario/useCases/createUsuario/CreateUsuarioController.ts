import { Request, Response } from "express";
import { CreateUsuarioUseCase } from "./CreateUsuarioUseCase"

export class CreateUsuarioController {
    async handle(req: Request, res: Response) {
        const { nome, email, senha, admin } = req.body;

        const createUsuarioUseCase = new CreateUsuarioUseCase();

        const result = await createUsuarioUseCase.execute({ nome, email, senha, admin});

        return res.status(201).json(result);
    }
}