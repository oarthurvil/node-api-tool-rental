import { Usuario } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadAllUsuariosUseCase {
    async execute(): Promise<Usuario[]> {

        const usuarioAlreadyExists = await prisma.usuario.findMany();

        if (usuarioAlreadyExists.length === 0) {
            throw new AppError("Usuário table is empty!");
        }

        return usuarioAlreadyExists;
    }
}