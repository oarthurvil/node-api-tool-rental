import { Request, Response } from "express";
import { ReadAllLocacoesUseCase } from "./ReadAllLocacoesUseCase"

export class ReadAllLocacoesController {
    async handle(req: Request, res: Response) {

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const readAllLocacoesUseCase = new ReadAllLocacoesUseCase();

        const result = await readAllLocacoesUseCase.execute(idUsuarioViaToken);

        return res.status(200).json(result);
    }
}