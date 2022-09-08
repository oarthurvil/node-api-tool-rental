import { Request, Response } from "express";
import { UpdateUniqueFerramentaUseCase } from "./UpdateUniqueFerramentaUseCase"

export class UpdateUniqueFerramentaController {
    async handle(req: Request, res: Response) {

        const { id } = req.params;
        const { nome, condicoes, cidade, uf, proprietarioId } = req.body;

        const authToken = req.headers.authorization;
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));
        const idUsuarioViaToken = tokenUsuario.sub

        const updateUniqueFerramentaUseCase = new UpdateUniqueFerramentaUseCase();

        const result = await updateUniqueFerramentaUseCase.execute(Number(id), { nome, condicoes, cidade, uf, proprietarioId }, idUsuarioViaToken);

        return res.status(200).json(result);
    }
}