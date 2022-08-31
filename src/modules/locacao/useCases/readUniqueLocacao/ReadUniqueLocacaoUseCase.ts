import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadUniqueLocacaoUseCase {
    async execute( id: number ) {

        // Verificar a existência de um ferramenta
        const locacaoAlreadyExists = await prisma.locacao.findUnique({
            where: {
                id: id
            }
        });

        if (!locacaoAlreadyExists) {
            throw new AppError("Locacao doesn't exist!");
        }


        return locacaoAlreadyExists;
    }
}