import { Usuario } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadUniqueUsuarioUseCase {
    async execute(id: string, idUsuarioViaToken: string): Promise<Usuario | Object> {

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token
        if (id === idUsuarioViaToken || usuarioAdmin.admin) {
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

        const outputReadUniqueUsuarioFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputReadUniqueUsuarioFail;
    }
}