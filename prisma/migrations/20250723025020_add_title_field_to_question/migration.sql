/*
  Warnings:

  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `questionLink` on the `Question` table. All the data in the column will be lost.
  - Added the required column `content` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question",
DROP COLUMN "questionLink",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
