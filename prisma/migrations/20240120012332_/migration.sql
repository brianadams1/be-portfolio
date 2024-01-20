/*
  Warnings:

  - Added the required column `phone` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `phone` VARCHAR(100) NOT NULL;
