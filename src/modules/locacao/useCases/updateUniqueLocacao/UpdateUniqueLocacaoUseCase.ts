import { Ferramenta, Locacao } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateLocacaoDTO } from "../../dtos/CreateLocacaoDTO";

export class UpdateUniqueLocacaoUseCase {
    async execute(id: number, { valor, seguro, ferramentaId, locatarioId }: CreateLocacaoDTO, idUsuarioViaToken: string): Promise<Locacao | Object> {

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token
        if (locatarioId === idUsuarioViaToken || usuarioAdmin.admin) {
            // Verificar a existência de uma locacao
            const locacaoAlreadyExists = await prisma.locacao.findUnique({
                where: {
                    id: id
                }
            });

            if (!locacaoAlreadyExists) {
                throw new AppError("A Locação não existe");
            }

            // Verificar a existência da ferramenta
            const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
                where: {
                    id: ferramentaId
                }
            });

            if (!ferramentaAlreadyExists) {
                throw new AppError("A Ferramenta não existe.");
            }

            // Verificar a existência de locacao com a ferramenta
            const locacaoFerramentaAlreadyExists = await prisma.locacao.findMany({
                where: {
                    ferramentaId: ferramentaId
                }
            });

            if (locacaoFerramentaAlreadyExists.length > 1) {
                throw new AppError("A Ferramenta já está locada.");
            }

            // Verificar a existência do locatario
            const locatarioAlreadyExists = await prisma.usuario.findUnique({
                where: {
                    id: locatarioId
                }
            });

            if (!locatarioAlreadyExists) {
                throw new AppError("O Locatário não existe!");
            }

            // verificar se o proprietario e locatario são iguais
            if (ferramentaAlreadyExists.proprietarioId === locatarioAlreadyExists.id) {
                throw new AppError("O ID de locador e locatário não pode ser o mesmo");
            }

            // verificar se já existe uma locacao com id diferente, mas com a ferramenta e usuario
            const anotherLocacaoAlreadyExists = await prisma.locacao.findFirst({
                where: {
                    valor: valor, 
                    seguro: seguro,
                    ferramentaId: ferramentaId,
                    locatarioId: locatarioId
                }
            })

            if (anotherLocacaoAlreadyExists) {
                throw new AppError("A Locação já existe!");
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

        const outputUpdateUniqueLocacaoFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputUpdateUniqueLocacaoFail;
    }
}