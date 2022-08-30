import { Request, Response } from "express";
import { ReadUniqueFerramentaUseCase } from "./ReadUniqueFerramentaUseCase"

export class ReadUniqueFerramentaController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const readUniqueFerramentaUseCase = new ReadUniqueFerramentaUseCase();

        const result = await readUniqueFerramentaUseCase.execute( Number(id) );

        return res.status(201).json(result);
    }
}