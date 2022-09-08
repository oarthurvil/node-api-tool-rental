import { Request, Response } from "express";
import { UpdateUniqueUsuarioUseCase } from "./UpdateUniqueUsuarioUseCase"

export class UpdateUniqueUsuarioController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;
        const { nome, email, senha, admin } = req.body;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const updateUniqueUsuarioUseCase = new UpdateUniqueUsuarioUseCase();

        const result = await updateUniqueUsuarioUseCase.execute( id, {nome, email, senha, admin}, idUsuarioViaToken );

        return res.status(200).json(result);
    }
}