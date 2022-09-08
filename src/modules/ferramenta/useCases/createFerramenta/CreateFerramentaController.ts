import { Request, Response } from "express";
import { CreateFerramentaUseCase } from "./CreateFerramentaUseCase"

export class CreateFerramentaController {
    async handle(req: Request, res: Response) {
        const { nome, condicoes, cidade, uf, proprietarioId } = req.body;

        const authToken = req.headers.authorization;        
        const tokenUsuario = JSON.parse(atob(authToken.split('.')[1]));         
        const idUsuarioViaToken = tokenUsuario.sub 

        const createFerramentaUseCase = new CreateFerramentaUseCase();

        const result = await createFerramentaUseCase.execute({ nome, condicoes, cidade, uf, proprietarioId }, idUsuarioViaToken);

        return res.status(201).json(result);
    }
}