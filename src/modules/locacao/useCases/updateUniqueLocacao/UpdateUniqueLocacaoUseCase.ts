import { Ferramenta, Locacao } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateLocacaoDTO } from "../../dtos/CreateLocacaoDTO";

export class UpdateUniqueLocacaoUseCase {
    async execute(id: number, { valor, seguro, ferramentaId, locatarioId }: CreateLocacaoDTO): Promise<Locacao> {

        // Verificar a existência de uma locacao
        const locacaoAlreadyExists = await prisma.locacao.findUnique({
            where: {
                id: id
            }
        });

        if (!locacaoAlreadyExists) {
            throw new AppError("Locacao doesn't exist!");
        }

        // Verificar a existência da ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: ferramentaId
            }
        });

        if (!ferramentaAlreadyExists) {
            throw new AppError("Ferramenta doesn't exist!");
        }

        // Verificar a existência de locacao com a ferramenta
        const locacaoFerramentaAlreadyExists = await prisma.locacao.findMany({
            where: {
                ferramentaId: ferramentaId
            }
        });

        if (locacaoFerramentaAlreadyExists.length > 1) {
            throw new AppError("Ferramenta in Locacao!");
        }

        // Verificar a existência do locatario
        const locatarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: locatarioId
            }
        });

        if (!locatarioAlreadyExists) {
            throw new AppError("Locatario doesn't exist!");
        }

        // verificar se o proprietario e locatario são iguais
        if(ferramentaAlreadyExists.proprietarioId === locatarioAlreadyExists.id){
            throw new AppError("Proprietario and Locatario have same ID.");
        }

        // verificar se já existe uma locacao com id diferente, mas com a ferramenta e usuario
        const anotherLocacaoAlreadyExists = await prisma.locacao.findFirst({
            where: {
                ferramentaId: ferramentaId,
                locatarioId: locatarioId
            }
        })

        if (anotherLocacaoAlreadyExists) {
            throw new AppError("Locacao exist!");
        }


        const updateLocacao = await prisma.locacao.update({
            where: {
                id: id
            },
            data: {
                valor: valor, 
                seguro: seguro, 
                ferramentaId: ferramentaId, 
                locatarioId: locatarioId
            }
        })

        return updateLocacao;
    }
}