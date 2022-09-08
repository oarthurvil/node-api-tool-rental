# Desafio Node & Angular

Este desafio faz parte do estudo de Node dentro do programa GFT STARTER #4 de 2022. A proposta era a criação de uma API de acordo com o tema escolhido, esse tema posteriormente passou por aprovação dos instrutores. O tema escolhido foi uma aplicação de locação de ferramentas.

## Configurando e Iniciando a Aplicação

Para iniciar a aplicação é necessário a instalação das dependências do projeto, para isso utilizamos o comando de instalação pelo terminal: 

```
npm i
```

Após a instalação das dependências é necessário a configuração do banco de dados do projeto, para isso é necessário editar o caminho que esta no documento ".env", está configurado dessa forma:

```
DATABASE_URL="mysql://root:root@localhost:3306/desafio_node_angular"
```

A documentação do ORM Prisma estabelece que a configuração seja de acordo com:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Com o banco de dados da aplicação configurado corretamente vamos utilizar um script para criar esse banco, na pasta do projeto digite no console o seguinte comando:

```
npm run start:database
```

Este comando irá criar um banco MySQL de acordo com as configuração feitas anteriormente, agora a título de teste da aplicação seria interessante popular esse bando com um script sql já criado, para isso utilizaremos o comando:

```
npm run start:seed
```

Com o nosso banco criado e populado resta colocar a aplicação para rodar, para isso o comando:
```
npm run start
```

## END POINTS da Aplicação

O projeto possui três entidades, usuário, ferramenta e locações, que são manipuladas através de seus respectivos CRUDS, para uma melhor compreensão, as funcionalidades da Aplicação, seus "end points", methods HTTP podem ser verificados pela documentação criada via Postman no endereço [Documentação API Postman](https://documenter.getpostman.com/view/19928724/VV54pscy).
