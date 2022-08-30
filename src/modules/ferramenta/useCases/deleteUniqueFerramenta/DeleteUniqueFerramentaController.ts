import { Request, Response } from "express";
import { DeleteUniqueFerramentaUseCase } from "./DeleteUniqueFerramentaUseCase"

export class DeleteUniqueFerramentaController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const deleteUniqueFerramentaUseCase = new DeleteUniqueFerramentaUseCase();

        const result = await deleteUniqueFerramentaUseCase.execute( Number(id) );

        return res.status(201).json(result);
    }
}