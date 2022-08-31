import { Locacao } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadAllLocacoesUseCase {
    async execute(): Promise<Locacao[]> {

        const locacoesAlreadyExists = await prisma.locacao.findMany();

        if (locacoesAlreadyExists.length === 0) {
            throw new AppError("Locacoes table is empty!");
        }

        return locacoesAlreadyExists;
    }
}