import { Request, Response } from "express";
import { DeleteUniqueLocacaoUseCase } from "./DeleteUniqueLocacaoUseCase"

export class DeleteUniqueLocacaoController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const deleteUniqueLocacaoUseCase = new DeleteUniqueLocacaoUseCase();

        const result = await deleteUniqueLocacaoUseCase.execute( Number(id) );

        return res.status(201).json(result);
    }
}