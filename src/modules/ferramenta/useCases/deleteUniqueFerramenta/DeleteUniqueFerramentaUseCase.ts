import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUniqueFerramentaUseCase {
    async execute(id: number, idUsuarioViaToken: string) {

        // Verificar a existência de uma ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: id
            }
        });

        // Verificar o proprietário da ferramenta
        const proprietarioFerramenta = await prisma.usuario.findUnique({
            where: {
                id: ferramentaAlreadyExists.proprietarioId
            }
        })

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token
        if (proprietarioFerramenta.id === idUsuarioViaToken || usuarioAdmin.admin) {            

            if (!ferramentaAlreadyExists) {
                throw new AppError("Ferramenta não existe.");
            }

            const ferramentaDelete = await prisma.ferramenta.delete({
                where: {
                    id: id
                }
            });            

            const outputDeleteFerramenta = {
                ferramenta: ferramentaAlreadyExists,
                proprietario: {
                    id: proprietarioFerramenta?.id,
                    nome: proprietarioFerramenta?.nome,
                    email: proprietarioFerramenta?.email,
                },
                message: "Ferramenta deletada."
            }

            return outputDeleteFerramenta;
        }

        const outputDeleteFerramentaFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputDeleteFerramentaFail;
    }
}