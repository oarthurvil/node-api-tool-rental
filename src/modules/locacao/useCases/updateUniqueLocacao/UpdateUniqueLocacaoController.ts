import { Request, Response } from "express";
import { UpdateUniqueLocacaoUseCase } from "./UpdateUniqueLocacaoUseCase"

export class UpdateUniqueLocacaoController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;
        const { valor, seguro, ferramentaId, locatarioId } = req.body;


        const updateUniqueLocacaoUseCase = new UpdateUniqueLocacaoUseCase();

        const result = await updateUniqueLocacaoUseCase.execute( Number(id), { valor, seguro, ferramentaId, locatarioId } );

        return res.status(201).json(result);
    }
}