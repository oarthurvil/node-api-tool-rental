import { Request, Response } from "express";
import { DeleteUniqueLocacaoUseCase } from "./DeleteUniqueLocacaoUseCase"

export class DeleteUniqueLocacaoController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const deleteUniqueLocacaoUseCase = new DeleteUniqueLocacaoUseCase();

        const result = await deleteUniqueLocacaoUseCase.execute( Number(id), idUsuarioViaToken );

        return res.status(200).json(result);
    }
}