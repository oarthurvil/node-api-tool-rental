import { Usuario } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadUniqueUsuarioUseCase {
    async execute( id: number ): Promise<Usuario> {

        // Verificar a existência de um usuario
        const usuarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: id
            }
        });

        if (!usuarioAlreadyExists) {
            throw new AppError("Usuario doesn't exist!");
        }

        return usuarioAlreadyExists;
    }
}