-- AlterTable
ALTER TABLE `logactivity` ADD COLUMN `new_data` JSON NULL,
    ADD COLUMN `previous_data` JSON NULL;
