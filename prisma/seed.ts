import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { hash } from "bcryptjs"


async function main() {

    // Criando Usuários

    const senhaPadrao = await hash("123456", 8);


    const usuario1 = await prisma.usuario.create({
        data: {
            nome: "Usuário 1",
            email: "usuario1@ex.com",
            senha: senhaPadrao,
            admin: true
        }
    })

    const usuario2 = await prisma.usuario.create({
        data: {
            nome: "Usuário 2",
            email: "usuario2@ex.com",
            senha: senhaPadrao,
            admin: false
        }
    })

    const usuario3 = await prisma.usuario.create({
        data: {
            nome: "Usuário 3",
            email: "usuario3@ex.com",
            senha: senhaPadrao,
            admin: false
        }
    })

    const usuario4 = await prisma.usuario.create({
        data: {
            nome: "Usuário 4",
            email: "usuario4@ex.com",
            senha: senhaPadrao,
            admin: false
        }
    })

    const usuario5 = await prisma.usuario.create({
        data: {
            nome: "Usuário 5",
            email: "usuario5@ex.com",
            senha: senhaPadrao,
            admin: false
        }
    })

    // Criando Ferramentas
    const ferramenta1 = await prisma.ferramenta.create({
        data: {
            nome: "Ferramenta 1",
            condicoes: "Boa",
            cidade: "Cidade",
            uf: "BA",
            proprietarioId: usuario1.id
        }
    })

    const ferramenta2 = await prisma.ferramenta.create({
        data: {
            nome: "Ferramenta 2",
            condicoes: "Boa",
            cidade: "Cidade",
            uf: "AM",
            proprietarioId: usuario2.id
        }
    })

    const ferramenta3 = await prisma.ferramenta.create({
        data: {
            nome: "Ferramenta 3",
            condicoes: "Boa",
            cidade: "Cidade",
            uf: "GO",
            proprietarioId: usuario3.id
        }
    })

    const ferramenta4 = await prisma.ferramenta.create({
        data: {
            nome: "Ferramenta 4",
            condicoes: "Boa",
            cidade: "Cidade",
            uf: "AL",
            proprietarioId: usuario4.id
        }
    })

    const ferramenta5 = await prisma.ferramenta.create({
        data: {
            nome: "Ferramenta 5",
            condicoes: "Boa",
            cidade: "Cidade",
            uf: "MA",
            proprietarioId: usuario5.id
        }
    })

    const ferramenta6 = await prisma.ferramenta.create({
        data: {
            nome: "Ferramenta 6",
            condicoes: "Boa",
            cidade: "Cidade",
            uf: "DF",
            proprietarioId: usuario5.id
        }
    })

    // Criando Locações
    const locacao1 = await prisma.locacao.create({
        data: {
            valor: 100,
            seguro: false,
            ferramentaId: 5,
            locatarioId: usuario2.id
        }
    })

    const locacao2 = await prisma.locacao.create({
        data: {
            valor: 200,
            seguro: true,
            ferramentaId: 4,
            locatarioId: usuario3.id
        }
    })

    const locacao3 = await prisma.locacao.create({
        data: {
            valor: 100,
            seguro: false,
            ferramentaId: 3,
            locatarioId: usuario4.id
        }
    })

    const locacao4 = await prisma.locacao.create({
        data: {
            valor: 100,
            seguro: false,
            ferramentaId: 2,
            locatarioId: usuario5.id
        }
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })