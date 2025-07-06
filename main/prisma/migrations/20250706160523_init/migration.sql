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
