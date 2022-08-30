import { Usuario } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUsuarioDTO } from "../../dtos/CreateUsuarioDTO";

export class UpdateUniqueUsuarioUseCase {
    async execute( id: number, {nome, email, senha}: CreateUsuarioDTO ): Promise<Usuario> {

        // Verificar a existência de um usuario
        const usuarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: id
            }
        });

        if (!usuarioAlreadyExists) {
            throw new AppError("Usuario doesn't exist!");
        }

        const updateUsuario = await prisma.usuario.update({
            where: {
                id: id
            }, 
            data: {
                nome: nome,
                email: email,
                senha: senha
            }
        })

        return updateUsuario;
    }
}