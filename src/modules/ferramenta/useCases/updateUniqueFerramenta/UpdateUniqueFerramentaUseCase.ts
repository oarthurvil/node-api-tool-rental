import { Ferramenta } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateFerramentaDTO } from "../../dtos/CreateFerramentaDTO";

export class UpdateUniqueFerramentaUseCase {
    async execute(id: number, { nome, condicoes, cidade, uf, proprietarioId }: CreateFerramentaDTO, idUsuarioViaToken: string): Promise<Ferramenta | Object> {

        // Verificar a existência de uma ferramenta
        const ferramentaAlreadyExists = await prisma.ferramenta.findUnique({
            where: {
                id: id
            }
        });

        // verificar a existência do proprietario
        const proprietarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                id: proprietarioId
            }
        })

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token
        if (ferramentaAlreadyExists.proprietarioId === idUsuarioViaToken || usuarioAdmin.admin) {
            if (!ferramentaAlreadyExists) {
                throw new AppError("A ferramenta não existe.");
            }

            if (!proprietarioAlreadyExists) {
                throw new AppError("O Proprietário não existe.");
            }


            const updateFerramenta = await prisma.ferramenta.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    condicoes: condicoes,
                    cidade: cidade,
                    uf: uf,
                    proprietarioId: proprietarioId
                }
            })

            return updateFerramenta;
        }

        const outputUpdateFerramentaFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputUpdateFerramentaFail;
    }
}