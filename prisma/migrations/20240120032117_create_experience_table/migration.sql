/*
  Warnings:

  - Added the required column `svg` to the `skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `skill` ADD COLUMN `svg` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `experience` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(100) NOT NULL,
    `location` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
