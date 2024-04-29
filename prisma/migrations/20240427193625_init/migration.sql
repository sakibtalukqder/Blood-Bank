/*
  Warnings:

  - You are about to drop the `donor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `donor` DROP FOREIGN KEY `Donor_ReststeredBy_fkey`;

-- DropTable
DROP TABLE `donor`;

-- CreateTable
CREATE TABLE `Donner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `Area` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `bloodType` VARCHAR(191) NOT NULL,
    `status` ENUM('DONNER', 'CANDIDATE') NOT NULL DEFAULT 'CANDIDATE',
    `approvedBy` INTEGER NULL,

    UNIQUE INDEX `Donner_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Donner` ADD CONSTRAINT `Donner_approvedBy_fkey` FOREIGN KEY (`approvedBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
