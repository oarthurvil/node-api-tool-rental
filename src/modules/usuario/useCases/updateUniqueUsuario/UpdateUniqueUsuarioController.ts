import { Request, Response } from "express";
import { UpdateUniqueUsuarioUseCase } from "./UpdateUniqueUsuarioUseCase"

export class UpdateUniqueUsuarioController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;
        const { nome, email, senha } = req.body;

        const updateUniqueUsuarioUseCase = new UpdateUniqueUsuarioUseCase();

        const result = await updateUniqueUsuarioUseCase.execute( Number(id), {nome, email, senha} );

        return res.status(201).json(result);
    }
}