import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUniqueLocacaoUseCase {
    async execute(id: number) {

        // Verificar a existência de uma locacao
        const locacaoAlreadyExists = await prisma.locacao.findUnique({
            where: {
                id: id
            }
        });

        if (!locacaoAlreadyExists) {
            throw new AppError("Locacao doesn't exist!");
        }


        const locacaoDelete = await prisma.locacao.delete({
            where: {
                id: id
            }
        });

        const outputDeleteLocacao = {
            locacao: locacaoAlreadyExists,
            message: "Locacao deleted."
        }

        return outputDeleteLocacao;
    }
}