/*
  Warnings:

  - You are about to drop the `_MeetingToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userAvailabilityId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `meetingId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAvailabilityId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAvailability" DROP CONSTRAINT "UserAvailability_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "UserAvailability" DROP CONSTRAINT "UserAvailability_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MeetingToUser" DROP CONSTRAINT "_MeetingToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MeetingToUser" DROP CONSTRAINT "_MeetingToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "meetingId" TEXT NOT NULL,
ADD COLUMN     "userAvailabilityId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_MeetingToUser";

-- CreateIndex
CREATE UNIQUE INDEX "User_userAvailabilityId_key" ON "User"("userAvailabilityId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userAvailabilityId_fkey" FOREIGN KEY ("userAvailabilityId") REFERENCES "UserAvailability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
