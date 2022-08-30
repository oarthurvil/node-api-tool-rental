import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadUniqueFerramentaUseCase {
    async execute( id: number ) {

        // Verificar a existência de um ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: id
            }
        });

        if (!ferramentaAlreadyExists) {
            throw new AppError("ferramenta doesn't exist!");
        }

        const proprietarioFerramenta = await prisma.usuario.findUnique({
            where: {
                id: ferramentaAlreadyExists.proprietarioId
            }
        })

        const outputReadFerramenta = {
            ferramenta: ferramentaAlreadyExists,
            proprietario: {
                id: proprietarioFerramenta?.id,
                nome: proprietarioFerramenta?.nome,
                email: proprietarioFerramenta?.email,
            }
        }

        return outputReadFerramenta;
    }
}