import { Request, Response } from "express";
import { UpdateUniqueFerramentaUseCase } from "./UpdateUniqueFerramentaUseCase"

export class UpdateUniqueFerramentaController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;
        const { nome, condicoes, localizacao, proprietarioId } = req.body;

        const updateUniqueFerramentaUseCase = new UpdateUniqueFerramentaUseCase();

        const result = await updateUniqueFerramentaUseCase.execute( Number(id), { nome, condicoes, localizacao, proprietarioId } );

        return res.status(201).json(result);
    }
}