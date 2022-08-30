import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUsuarioDTO } from "../../dtos/CreateUsuarioDTO";

export class CreateUsuarioUseCase {
    async execute({ nome, email, senha }: CreateUsuarioDTO) {

        // Verificar a existência do usuario
        const usuarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                email
            }
        });

        if (usuarioAlreadyExists) {
            throw new AppError("Usuário already exists!");
        }

        // Criar um usuario
        const usuario = await prisma.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: senha
            }
        })

        return usuario;
    }
}