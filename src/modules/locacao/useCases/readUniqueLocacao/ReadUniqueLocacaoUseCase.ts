import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadUniqueLocacaoUseCase {
    async execute(id: number, idUsuarioViaToken: string) {

        // Verificar a existência de uma Locacao
        const locacaoAlreadyExists = await prisma.locacao.findUnique({
            where: {
                id: id
            }
        });

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token ou usuario admin
        if (locacaoAlreadyExists.locatarioId === idUsuarioViaToken || usuarioAdmin.admin) {
            

            if (!locacaoAlreadyExists) {
                throw new AppError("Locacao doesn't exist!");
            }


            return locacaoAlreadyExists;
        }

        const outputReadUniqueLocacaoFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputReadUniqueLocacaoFail;


    }
}