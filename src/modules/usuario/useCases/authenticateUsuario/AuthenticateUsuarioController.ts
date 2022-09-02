import { Request, Response } from "express";
import { AuthenticateUsuarioUsecase } from "./AuthenticateUsuarioUsecase";



class AuthenticateUsuarioController {
    async handle(req: Request, res: Response) {
        const { email, senha } = req.body;

        const authenticateUsuarioUsecase = new AuthenticateUsuarioUsecase();

        const token = await authenticateUsuarioUsecase.execute({ email, senha});

        return res.status(201).json(token);
    }
}

export { AuthenticateUsuarioController }