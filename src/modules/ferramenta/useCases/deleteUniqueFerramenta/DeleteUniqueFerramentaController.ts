import { Request, Response } from "express";
import { DeleteUniqueFerramentaUseCase } from "./DeleteUniqueFerramentaUseCase"

export class DeleteUniqueFerramentaController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const deleteUniqueFerramentaUseCase = new DeleteUniqueFerramentaUseCase();

        const result = await deleteUniqueFerramentaUseCase.execute( Number(id), idUsuarioViaToken );

        return res.status(200).json(result);
    }
}