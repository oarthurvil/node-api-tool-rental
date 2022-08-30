import { Ferramenta } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateFerramentaDTO } from "../../dtos/CreateFerramentaDTO";

export class UpdateUniqueFerramentaUseCase {
    async execute( id: number, { nome, condicoes, localizacao, proprietarioId }: CreateFerramentaDTO ): Promise<Ferramenta> {

        // Verificar a existência de uma ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: id
            }
        });

        if (!ferramentaAlreadyExists) {
            throw new AppError("Ferramenta doesn't exist!");
        }

        const updateFerramenta = await prisma.ferramenta.update({
            where: {
                id: id
            }, 
            data: {
                nome: nome,
                condicoes: condicoes,
                localizacao: localizacao,
                proprietarioId: proprietarioId
            }
        })

        return updateFerramenta;
    }
}