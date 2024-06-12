/*
  Warnings:

  - Made the column `name` on table `Hotel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hotel" ALTER COLUMN "name" SET NOT NULL;
