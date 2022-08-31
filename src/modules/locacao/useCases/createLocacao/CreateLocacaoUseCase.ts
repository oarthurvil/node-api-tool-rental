import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateLocacaoDTO } from "../../dtos/CreateLocacaoDTO";

export class CreateLocacaoUseCase {
    async execute({ valor, seguro, ferramentaId, locatarioId }: CreateLocacaoDTO ) {

        // Verificar a existência do locatario
        const locatarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: locatarioId
            }
        });

        if (!locatarioAlreadyExists) {
            throw new AppError("Locatário doesn't exists!");
        }

        // Verificar a existência da ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: ferramentaId
            }
        });

        if (!ferramentaAlreadyExists) {
            throw new AppError("Ferramenta doesn't exists!");
        }

        // Verificar os dados do proprietário
        const proprietario = await prisma.usuario.findUnique({
            where: {
                id: ferramentaAlreadyExists.proprietarioId
            }
        })

        // Proprietário e locatário precisam ser diferentes
        if (locatarioAlreadyExists.id === proprietario?.id) {
            throw new AppError("Same ID locador and locatário.");
        }

        // Verificar se já existe a locacao
        const locacaoAlreadyExists = await prisma.locacao.findFirst({
            where: {
                ferramentaId: ferramentaId
            }
        })

        if (locacaoAlreadyExists) {
            throw new AppError("Ferramenta in Locacao.");
        }

        // Criar uma locacao
        const locacao = await prisma.locacao.create({
            data: {
                valor: valor, 
                seguro: seguro, 
                ferramentaId: ferramentaId, 
                locatarioId: locatarioId
            }
        })

        const outputCreateLocacao = {
            locacao: locacao,
            ferramenta: {
                id: ferramentaAlreadyExists.id,
                nome: ferramentaAlreadyExists.nome,
                condicoes: ferramentaAlreadyExists.condicoes,
                localizacao: ferramentaAlreadyExists.localizacao
            },
            proprietario: {
                id: proprietario?.id,
                nome: proprietario?.nome,
                email: proprietario?.email
            },
            locatario: {
                id: locatarioAlreadyExists?.id,
                nome: locatarioAlreadyExists?.nome,
                email: locatarioAlreadyExists?.email
            }

        }

        return outputCreateLocacao;
    }
}