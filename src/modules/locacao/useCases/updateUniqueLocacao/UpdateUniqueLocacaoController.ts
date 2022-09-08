import { Request, Response } from "express";
import { UpdateUniqueLocacaoUseCase } from "./UpdateUniqueLocacaoUseCase"

export class UpdateUniqueLocacaoController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;
        const { valor, seguro, ferramentaId, locatarioId } = req.body;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const updateUniqueLocacaoUseCase = new UpdateUniqueLocacaoUseCase();

        const result = await updateUniqueLocacaoUseCase.execute( Number(id), { valor, seguro, ferramentaId, locatarioId }, idUsuarioViaToken );

        return res.status(200).json(result);
    }
}