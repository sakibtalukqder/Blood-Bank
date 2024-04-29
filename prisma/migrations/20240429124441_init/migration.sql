/*
  Warnings:

  - You are about to drop the column `approvedBy` on the `donner` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `donner` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `donner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Donner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `donner` DROP FOREIGN KEY `Donner_approvedBy_fkey`;

-- DropIndex
DROP INDEX `Donner_email_key` ON `donner`;

-- AlterTable
ALTER TABLE `donner` DROP COLUMN `approvedBy`,
    DROP COLUMN `email`,
    DROP COLUMN `phone`,
    ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Donner_userId_key` ON `Donner`(`userId`);

-- AddForeignKey
ALTER TABLE `Donner` ADD CONSTRAINT `Donner_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
