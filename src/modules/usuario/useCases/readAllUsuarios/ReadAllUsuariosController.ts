import { Request, Response } from "express";
import { ReadAllUsuariosUseCase } from "./ReadAllUsuariosUseCase"

export class ReadAllUsuariosController {
    async handle(req: Request, res: Response) {

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const readAllUsuariosUseCase = new ReadAllUsuariosUseCase();

        const result = await readAllUsuariosUseCase.execute( idUsuarioViaToken );

        return res.status(200).json(result);
    }
}