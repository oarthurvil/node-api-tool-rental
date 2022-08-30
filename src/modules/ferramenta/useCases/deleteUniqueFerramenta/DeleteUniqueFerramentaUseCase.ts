import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class DeleteUniqueFerramentaUseCase {
    async execute(id: number) {

        // Verificar a existência de uma ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: id
            }
        });

        if (!ferramentaAlreadyExists) {
            throw new AppError("Ferramenta doesn't exist!");
        }


        const ferramentaDelete = await prisma.ferramenta.delete({
            where: {
                id: id
            }
        });

        const proprietarioFerramenta = await prisma.usuario.findUnique({
            where: {
                id: ferramentaAlreadyExists.proprietarioId
            }
        })

        const outputDeleteFerramenta = {
            ferramenta: ferramentaAlreadyExists,
            proprietario: {
                id: proprietarioFerramenta?.id,
                nome: proprietarioFerramenta?.nome,
                email: proprietarioFerramenta?.email,
            },
            message: "Ferramenta deleted."
        }

        return outputDeleteFerramenta;
    }
}