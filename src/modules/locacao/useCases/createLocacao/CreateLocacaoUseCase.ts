import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateLocacaoDTO } from "../../dtos/CreateLocacaoDTO";

export class CreateLocacaoUseCase {
    async execute({ valor, seguro, ferramentaId, locatarioId }: CreateLocacaoDTO, idUsuarioViaToken: string) {

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar a existência do locatario
        const locatarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: locatarioId
            }
        });

        if (!locatarioAlreadyExists) {
            throw new AppError("O Locatário não existe!");
        }

        // Verificar a existência da ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: ferramentaId
            }
        });

        if (!ferramentaAlreadyExists) {
            throw new AppError("A Ferramenta não existe!");
        }
        
        // Verificar se o id enviado no parametro é o mesmo do usuário no token ou se ele é admin
        if (locatarioId === idUsuarioViaToken || usuarioAdmin.admin) {

            // Verificar os dados do proprietário
            const proprietario = await prisma.usuario.findUnique({
                where: {
                    id: ferramentaAlreadyExists.proprietarioId
                }
            })

            // Proprietário e locatário precisam ser diferentes
            if (locatarioAlreadyExists.id === proprietario?.id) {
                throw new AppError("O ID de locador e locatário não pode ser o mesmo");
            }

            // Verificar se já existe a locacao
            const locacaoAlreadyExists = await prisma.locacao.findFirst({
                where: {
                    ferramentaId: ferramentaId
                }
            })

            if (locacaoAlreadyExists) {
                throw new AppError("A Ferramenta já está locada.");
            }

            // Criar uma locacao
            const locacao = await prisma.locacao.create({
                data: {
                    valor: valor,
                    seguro: seguro,
                    ferramentaId: ferramentaId,
                    locatarioId: locatarioId
                }
            });

            const outputCreateLocacao = {
                locacao: locacao,
                ferramenta: {
                    id: ferramentaAlreadyExists.id,
                    nome: ferramentaAlreadyExists.nome,
                    condicoes: ferramentaAlreadyExists.condicoes,
                    cidade: ferramentaAlreadyExists.cidade,
                    uf: ferramentaAlreadyExists.uf
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

        const outputCreateFerramentaFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputCreateFerramentaFail;
    }
}