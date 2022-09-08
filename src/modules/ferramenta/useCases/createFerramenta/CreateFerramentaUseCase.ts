import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateFerramentaDTO } from "../../dtos/CreateFerramentaDTO";

export class CreateFerramentaUseCase {
    async execute({ nome, condicoes, cidade, uf, proprietarioId }: CreateFerramentaDTO, idUsuarioViaToken: string) : Promise<Object> {

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token ou se ele é admin
        if (proprietarioId === idUsuarioViaToken || usuarioAdmin.admin) {
            // Verificar a existência do usuário proprietário da ferramenta
            const usuarioAlreadyExists = await prisma.usuario.findUnique({
                where: {
                    id: proprietarioId
                }
            });

            if (!usuarioAlreadyExists) {
                throw new AppError("Usuário não existe!");
            }

            const ferramentaAlreadyExists = await prisma.ferramenta.findFirst({
                where: {
                    nome: nome,
                    proprietarioId: proprietarioId
                }
            });

            if (ferramentaAlreadyExists) {
                throw new AppError("Ferramenta já existe!");
            }

            // Criar uma ferramenta
            const ferramenta = await prisma.ferramenta.create({
                data: {
                    nome: nome,
                    condicoes: condicoes,
                    cidade: cidade,
                    uf: uf,
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

        const outputCreateFerramentaFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputCreateFerramentaFail;
    }
}