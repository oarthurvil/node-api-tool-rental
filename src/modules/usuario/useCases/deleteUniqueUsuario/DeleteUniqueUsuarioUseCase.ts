import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUniqueUsuarioUseCase {
    async execute(id: string, idUsuarioViaToken: string) {

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
                throw new AppError("Usuário não existe!");
            }

            const usuarioDelete = await prisma.usuario.delete({
                where: {
                    id: id
                }
            });


            const outputDeleteUsuario = {
                usuario: usuarioAlreadyExists,
                message: "Usuario deletado.",
            }

            return outputDeleteUsuario;
        }

        const outputDeleteUsuarioFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputDeleteUsuarioFail;

    }
}