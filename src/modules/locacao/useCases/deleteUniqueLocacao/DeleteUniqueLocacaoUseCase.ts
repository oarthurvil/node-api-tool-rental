import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUniqueLocacaoUseCase {
    async execute(id: number, idUsuarioViaToken: string) {

        // Verificar a existência de uma locacao
        const locacaoAlreadyExists = await prisma.locacao.findUnique({
            where: {
                id: id
            }
        });

        // Verificar qual é a ferramenta
        const ferramenta = await prisma.ferramenta.findUnique({
            where: {
                id: locacaoAlreadyExists.ferramentaId
            }
        })

        // Verificar o proprietário da ferramenta
        const proprietario = await prisma.usuario.findUnique({
            where: {
                id: ferramenta.proprietarioId
            }
        })

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token
        if (locacaoAlreadyExists.locatarioId === idUsuarioViaToken || proprietario.id === idUsuarioViaToken || usuarioAdmin.admin) {

            if (!locacaoAlreadyExists) {
                throw new AppError("O ID da locação não existe.");
            }

            const locacaoDelete = await prisma.locacao.delete({
                where: {
                    id: id
                }
            });

            const outputDeleteLocacao = {
                locacao: locacaoAlreadyExists,
                message: "A locação foi deletada."
            }

            return outputDeleteLocacao;
        }

        const outputDeleteLocacaoFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputDeleteLocacaoFail;
    }
}