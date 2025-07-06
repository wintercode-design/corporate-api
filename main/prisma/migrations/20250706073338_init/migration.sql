-- AlterTable
ALTER TABLE `event` ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT 'none';

-- AlterTable
ALTER TABLE `project` ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT 'none';

-- AlterTable
ALTER TABLE `teammember` ADD COLUMN `slug` VARCHAR(191) NOT NULL DEFAULT 'none';
