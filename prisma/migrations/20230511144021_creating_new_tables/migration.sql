/*
  Warnings:

  - Added the required column `payment_method` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` ADD COLUMN `card_id` INTEGER NULL,
    ADD COLUMN `payment_method` ENUM('CASH', 'CARD', 'TRANSFER', 'PIX') NOT NULL;

-- CreateTable
CREATE TABLE `CARDPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_number` VARCHAR(191) NOT NULL,
    `card_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_card_id_fkey` FOREIGN KEY (`card_id`) REFERENCES `CARDPayment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
