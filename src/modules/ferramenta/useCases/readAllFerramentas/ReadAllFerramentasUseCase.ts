import { Ferramenta } from "@prisma/client";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../prisma/client";

export class ReadAllFerramentasUseCase {
    async execute(): Promise<Ferramenta[]> {

        const ferramentaAlreadyExists = await prisma.ferramenta.findMany();

        if (ferramentaAlreadyExists.length === 0) {
            throw new AppError("Ferramenta table is empty!");
        }

        return ferramentaAlreadyExists;
    }
}