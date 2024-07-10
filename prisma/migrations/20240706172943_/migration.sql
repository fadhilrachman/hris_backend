/*
  Warnings:

  - You are about to alter the column `action_type` on the `logactivity` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `logactivity` MODIFY `action_type` VARCHAR(191) NOT NULL;
