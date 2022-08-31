import { Request, Response } from "express";
import { ReadUniqueLocacaoUseCase } from "./ReadUniqueLocacaoUseCase"

export class ReadUniqueLocacaoController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const readUniqueLocacaoUseCase = new ReadUniqueLocacaoUseCase();

        const result = await readUniqueLocacaoUseCase.execute( Number(id) );

        return res.status(201).json(result);
    }
}