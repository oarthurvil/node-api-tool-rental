import { Locacao } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadAllLocacoesUseCase {
    async execute(idUsuarioViaToken: string): Promise<Locacao[] | Object> {

        // Verificar o usuário do token
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o usuário é admin pelo token e retornar todas locações
        if (usuarioAdmin.admin) {
            const locacoesAlreadyExists = await prisma.locacao.findMany();

            if (locacoesAlreadyExists.length === 0) {
                throw new AppError("A tabela de Locações está vazia!");
            }

            return locacoesAlreadyExists;
        }

        // Verificar locacões pelo ID do locatario
        const locacoesByUsuarioLocatario = await prisma.locacao.findMany({
            where: {
                locatarioId: idUsuarioViaToken
            }
        })

       if (locacoesByUsuarioLocatario.length === 0) {
            throw new AppError("A tabela de Locações está vazia!");
        }

        if (!usuarioAdmin.admin && locacoesByUsuarioLocatario.length > 0) {
            return locacoesByUsuarioLocatario
        }
    }
}