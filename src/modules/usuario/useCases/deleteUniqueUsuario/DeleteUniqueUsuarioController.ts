import { Request, Response } from "express";
import { DeleteUniqueUsuarioUseCase } from "./DeleteUniqueUsuarioUseCase"

export class DeleteUniqueUsuarioController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 
        
        const deleteUniqueUsuarioUseCase = new DeleteUniqueUsuarioUseCase();

        const result = await deleteUniqueUsuarioUseCase.execute( id, idUsuarioViaToken );

        return res.status(200).json(result);
    }
}