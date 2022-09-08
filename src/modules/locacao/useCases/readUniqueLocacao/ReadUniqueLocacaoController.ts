import { Request, Response } from "express";
import { ReadUniqueLocacaoUseCase } from "./ReadUniqueLocacaoUseCase"

export class ReadUniqueLocacaoController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const readUniqueLocacaoUseCase = new ReadUniqueLocacaoUseCase();

        const result = await readUniqueLocacaoUseCase.execute( Number(id),  idUsuarioViaToken);

        return res.status(200).json(result);
    }
}