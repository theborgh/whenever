/*
  Warnings:

  - Added the required column `timezone` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "timezone" TEXT NOT NULL;
