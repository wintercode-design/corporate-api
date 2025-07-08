-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `linkUrl` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `priority` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `clicks` INTEGER NOT NULL DEFAULT 0,
    `impressions` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL DEFAULT 'none',
    `imageUrl` VARCHAR(191) NULL,
    `author` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `publishedDate` DATETIME(3) NOT NULL,
    `tags` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `replied` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL DEFAULT 'none',
    `date` DATETIME(3) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Faq` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(191) NOT NULL,
    `answer` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `order` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscriber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subscribedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `source` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Subscriber_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,
    `originalPrice` DOUBLE NOT NULL,
    `discountedPrice` DOUBLE NOT NULL,
    `discountPercentage` DOUBLE NOT NULL,
    `validUntil` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL DEFAULT 'none',
    `imageUrl` VARCHAR(191) NULL,
    `category` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientName` VARCHAR(191) NOT NULL,
    `clientTitle` VARCHAR(191) NOT NULL,
    `clientCompany` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `review` VARCHAR(191) NOT NULL,
    `projectType` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `clientImage` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL DEFAULT 'none',
    `role` VARCHAR(191) NOT NULL,
    `avatarUrl` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `linkedin` VARCHAR(191) NOT NULL,
    `github` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `resumeUrl` VARCHAR(191) NOT NULL,
    `achievements` VARCHAR(191) NOT NULL,
    `skills` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TeamMember_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `issuer` VARCHAR(191) NOT NULL,
    `teamMemberId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'RESOLVED', 'REJECTED', 'INPROGRESS', 'COMPLETED', 'HALTED') NOT NULL DEFAULT 'ACTIVE',
    `roleId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Permission_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NULL,
    `contactPerson` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `hasWebsite` BOOLEAN NULL,
    `website` VARCHAR(191) NULL,
    `businessDescription` VARCHAR(191) NULL,
    `targetAudience` VARCHAR(191) NULL,
    `products` VARCHAR(191) NULL,
    `goals` VARCHAR(191) NULL,
    `otherGoal` VARCHAR(191) NULL,
    `priorities` VARCHAR(191) NULL,
    `designLikes` VARCHAR(191) NULL,
    `designDislikes` VARCHAR(191) NULL,
    `colorPreferences` VARCHAR(191) NULL,
    `referenceWebsites` VARCHAR(191) NULL,
    `competitors` VARCHAR(191) NULL,
    `budget` VARCHAR(191) NULL,
    `timeline` VARCHAR(191) NULL,
    `additional` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RolePermissions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RolePermissions_AB_unique`(`A`, `B`),
    INDEX `_RolePermissions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserPermissions` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserPermissions_AB_unique`(`A`, `B`),
    INDEX `_UserPermissions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Certification` ADD CONSTRAINT `Certification_teamMemberId_fkey` FOREIGN KEY (`teamMemberId`) REFERENCES `TeamMember`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolePermissions` ADD CONSTRAINT `_RolePermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPermissions` ADD CONSTRAINT `_UserPermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPermissions` ADD CONSTRAINT `_UserPermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
