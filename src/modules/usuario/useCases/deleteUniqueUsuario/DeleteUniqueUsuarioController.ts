import { Request, Response } from "express";
import { DeleteUniqueUsuarioUseCase } from "./DeleteUniqueUsuarioUseCase"

export class DeleteUniqueUsuarioController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const deleteUniqueUsuarioUseCase = new DeleteUniqueUsuarioUseCase();

        const result = await deleteUniqueUsuarioUseCase.execute( id );

        return res.status(201).json(result);
    }
}