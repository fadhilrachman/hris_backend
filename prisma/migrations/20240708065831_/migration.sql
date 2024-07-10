/*
  Warnings:

  - Added the required column `ip` to the `LogActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `logactivity` ADD COLUMN `ip` VARCHAR(191) NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
