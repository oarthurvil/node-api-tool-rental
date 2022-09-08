import { hash } from "bcryptjs"
import { Usuario } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";
import { CreateUsuarioDTO } from "../../dtos/CreateUsuarioDTO";

export class UpdateUniqueUsuarioUseCase {
    async execute(id: string, { nome, email, senha, admin }: CreateUsuarioDTO, idUsuarioViaToken: string): Promise<Usuario | Object> {

        // Verificar se o usuário do token é admin
        const usuarioAdmin = await prisma.usuario.findUnique({
            where: {
                id: idUsuarioViaToken
            }
        });

        // Verificar se o id enviado no parametro é o mesmo do usuário no token
        if (id === idUsuarioViaToken || usuarioAdmin.admin) {
            // Verificar a existência de um usuario
            const usuarioAlreadyExists = await prisma.usuario.findUnique({
                where: {
                    id: id
                }
            });

            if (!usuarioAlreadyExists) {
                throw new AppError("ID de usuário não existe.");
            }

            // Verificar a existência de um usuario com mesmo email
            const usuarioEmailAlreadyExists = await prisma.usuario.findMany({
                where: {
                    email: email
                }
            });

            if (usuarioEmailAlreadyExists.length > 1) {
                throw new AppError("Usuário já existe.");
            }

            const senhaHash = await hash(senha, 8);

            const updateUsuario = await prisma.usuario.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    admin: admin
                }
            })

            return updateUsuario;
        }

        const outputUpdateUniqueUsuarioFail = {
            erro: "Falta de privilégio",
            message: "Você não possui privilégios para essa operação."
        }

        return outputUpdateUniqueUsuarioFail;

    }
}