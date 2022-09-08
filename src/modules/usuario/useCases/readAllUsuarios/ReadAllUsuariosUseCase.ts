import { Usuario } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadAllUsuariosUseCase {
    async execute(idUsuarioViaToken: string): Promise<Usuario[] | Object> {

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o usuário é admin pelo token
        if (usuarioAdmin.admin) {
            const usuarioAlreadyExists = await prisma.usuario.findMany();

            if (usuarioAlreadyExists.length === 0) {
                throw new AppError("Usuário table is empty!");
            }

            return usuarioAlreadyExists;
        }

        const outputReadAllUsuarioFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputReadAllUsuarioFail;


    }
}