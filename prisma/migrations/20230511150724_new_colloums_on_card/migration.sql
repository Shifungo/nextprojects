/*
  Warnings:

  - Added the required column `card_close_day` to the `CARDPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_due_day` to the `CARDPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_limit` to the `CARDPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cardpayment` ADD COLUMN `card_close_day` INTEGER NOT NULL,
    ADD COLUMN `card_due_day` INTEGER NOT NULL,
    ADD COLUMN `card_limit` VARCHAR(191) NOT NULL;
