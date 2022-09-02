import { Request, Response } from "express";
import { ReadUniqueUsuarioUseCase } from "./ReadUniqueUsuarioUseCase"

export class ReadUniqueUsuarioController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const readUniqueUsuarioUseCase = new ReadUniqueUsuarioUseCase();

        const result = await readUniqueUsuarioUseCase.execute( id );

        return res.status(201).json(result);
    }
}