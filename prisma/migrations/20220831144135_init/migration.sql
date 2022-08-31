/*
  Warnings:

  - You are about to drop the column `locadorId` on the `locacao` table. All the data in the column will be lost.
  - Added the required column `locatarioId` to the `Locacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `locacao` DROP FOREIGN KEY `Locacao_locadorId_fkey`;

-- AlterTable
ALTER TABLE `locacao` DROP COLUMN `locadorId`,
    ADD COLUMN `locatarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Locacao` ADD CONSTRAINT `Locacao_locatarioId_fkey` FOREIGN KEY (`locatarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
