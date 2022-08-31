import { Request, Response } from "express";
import { CreateLocacaoUseCase } from "./CreateLocacaoUseCase"

export class CreateLocacaoController {
    async handle(req: Request, res: Response) {
        const { valor, seguro, ferramentaId, locatarioId } = req.body;

        const createLocacaoUseCase = new CreateLocacaoUseCase();

        const result = await createLocacaoUseCase.execute({ valor, seguro, ferramentaId, locatarioId });

        return res.status(201).json(result);
    }
}