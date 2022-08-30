import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateFerramentaDTO } from "../../dtos/CreateFerramentaDTO";

export class CreateFerramentaUseCase {
    async execute({ nome, condicoes, localizacao, proprietarioId }: CreateFerramentaDTO ) {

        // Verificar a existência do usuário proprietário da ferramenta
        const usuarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: proprietarioId
            }
        });

        if (!usuarioAlreadyExists) {
            throw new AppError("Usuário doesn't exists!");
        }

        const ferramentaAlreadyExists = await prisma.ferramenta.findFirst({
            where: {
                nome: nome,
                proprietarioId: proprietarioId
            }
        });

        if (ferramentaAlreadyExists) {
            throw new AppError("Ferramenta exists!");
        }

        // Criar uma ferramenta
        const ferramenta = await prisma.ferramenta.create({
            data: {
                nome: nome,
                condicoes: condicoes,
                localizacao: localizacao, 
                proprietarioId: proprietarioId
            }
        })

        const outputCreateFerramenta = {
            ferramenta: ferramenta,
            proprietario: {
                id: usuarioAlreadyExists.id,
                nome: usuarioAlreadyExists.nome,
                email: usuarioAlreadyExists.email
            }
        }

        return outputCreateFerramenta;
    }
}