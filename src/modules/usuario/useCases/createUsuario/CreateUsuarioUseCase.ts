import { hash } from "bcryptjs"
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUsuarioDTO } from "../../dtos/CreateUsuarioDTO";

export class CreateUsuarioUseCase {
    async execute({ nome, email, senha }: CreateUsuarioDTO) {

        // Verificar a existência do usuario
        const usuarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                email: email
            }
        });

        if (usuarioAlreadyExists) {
            throw new AppError("O usuário já existe!");
        }

        // Criar um usuario
        const senhaHash = await hash(senha, 8);

        const usuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senhaHash
            }
        })

        return usuario;
    }
}