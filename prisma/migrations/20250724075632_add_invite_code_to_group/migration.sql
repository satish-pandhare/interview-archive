/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "inviteCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Group_inviteCode_key" ON "Group"("inviteCode");
