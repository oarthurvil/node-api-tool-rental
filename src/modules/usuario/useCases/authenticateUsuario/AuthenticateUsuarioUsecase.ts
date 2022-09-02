import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { prisma } from "../../../../prisma/client";

interface IRequest {
    email: string;
    senha: string;
}

class AuthenticateUsuarioUsecase {
    async execute({ email, senha }: IRequest) {

        // Verificar existência do usuário
        const usuarioAlreadyExists = await prisma.usuario.findFirst({
            where: {
                email: email
            }
        });

        if (!usuarioAlreadyExists) {
            throw new Error("Usuário ou senha inválidos")
        }

        // Verificar se a senha está correta
        const senhaMatch = await compare(senha, usuarioAlreadyExists.senha)

        if (!senhaMatch) {
            throw new Error("Usuário ou senha inválidos")
        }

        // Gerar token do usuário
        const token = sign({}, "821356fa-3ac1-4e99-9570-3266c65d07b8", {
            subject: usuarioAlreadyExists.id, 
            expiresIn: "200s"
        });

        return { token };
    }
}

export { AuthenticateUsuarioUsecase }