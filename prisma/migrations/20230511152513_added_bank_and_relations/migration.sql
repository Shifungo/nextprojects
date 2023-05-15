/*
  Warnings:

  - Added the required column `bank_account_id` to the `CARDPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activity` ADD COLUMN `cash_id` INTEGER NULL,
    ADD COLUMN `pix_id` INTEGER NULL,
    ADD COLUMN `transfer_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `cardpayment` ADD COLUMN `bank_account_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CASHPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_account_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PIXPayment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_account_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BankAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bank_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_cash_id_fkey` FOREIGN KEY (`cash_id`) REFERENCES `CASHPayment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_transfer_id_fkey` FOREIGN KEY (`transfer_id`) REFERENCES `TransferPayment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_pix_id_fkey` FOREIGN KEY (`pix_id`) REFERENCES `PIXPayment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferPayment` ADD CONSTRAINT `TransferPayment_bank_account_id_fkey` FOREIGN KEY (`bank_account_id`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PIXPayment` ADD CONSTRAINT `PIXPayment_bank_account_id_fkey` FOREIGN KEY (`bank_account_id`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CARDPayment` ADD CONSTRAINT `CARDPayment_bank_account_id_fkey` FOREIGN KEY (`bank_account_id`) REFERENCES `BankAccount`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
