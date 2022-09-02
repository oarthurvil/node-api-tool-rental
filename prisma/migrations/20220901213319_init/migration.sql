-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ferramenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `condicoes` VARCHAR(191) NOT NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `proprietarioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Locacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `seguro` BOOLEAN NOT NULL,
    `ferramentaId` INTEGER NOT NULL,
    `locatarioId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Locacao_ferramentaId_key`(`ferramentaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ferramenta` ADD CONSTRAINT `Ferramenta_proprietarioId_fkey` FOREIGN KEY (`proprietarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locacao` ADD CONSTRAINT `Locacao_ferramentaId_fkey` FOREIGN KEY (`ferramentaId`) REFERENCES `Ferramenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Locacao` ADD CONSTRAINT `Locacao_locatarioId_fkey` FOREIGN KEY (`locatarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
