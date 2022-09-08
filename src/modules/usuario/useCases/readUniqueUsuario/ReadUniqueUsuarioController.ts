import { Request, Response } from "express";
import { ReadUniqueUsuarioUseCase } from "./ReadUniqueUsuarioUseCase"

export class ReadUniqueUsuarioController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const readUniqueUsuarioUseCase = new ReadUniqueUsuarioUseCase();

        const result = await readUniqueUsuarioUseCase.execute( id,  idUsuarioViaToken);

        return res.status(200).json(result);
    }
}