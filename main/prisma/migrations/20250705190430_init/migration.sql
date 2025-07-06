/*
  Warnings:

  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [IN_PROGRESS] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `ads` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `blog` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `contact` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `faq` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `offer` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `project` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `subscriber` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `teammember` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL DEFAULT 'ACTIVE';
