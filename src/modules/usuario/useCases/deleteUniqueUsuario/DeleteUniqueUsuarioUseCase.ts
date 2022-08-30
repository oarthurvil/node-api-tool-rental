import { Usuario } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUniqueUsuarioUseCase {
    async execute( id: number ) {

        // Verificar a existência de um usuario
        const usuarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: id
            }
        });

        if (!usuarioAlreadyExists) {
            throw new AppError("Usuario doesn't exist!");
        } 
        

        const usuarioDelete = await prisma.usuario.delete({
            where: {
                id: id
            }
        });

        const outputDeleteUsuario = {
            usuario: usuarioAlreadyExists,
            message: "Usuario deleted."
        }

        return outputDeleteUsuario;
    }
}