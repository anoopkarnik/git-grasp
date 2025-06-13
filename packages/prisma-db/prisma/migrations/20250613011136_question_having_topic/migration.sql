/*
  Warnings:

  - You are about to drop the column `topicId` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `topicId` to the `QuizQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quiz_schema"."Quiz" DROP CONSTRAINT "Quiz_topicId_fkey";

-- AlterTable
ALTER TABLE "quiz_schema"."Quiz" DROP COLUMN "topicId";

-- AlterTable
ALTER TABLE "quiz_schema"."QuizQuestion" ADD COLUMN     "topicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "quiz_schema"."QuizQuestion" ADD CONSTRAINT "QuizQuestion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "quiz_schema"."Topic"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
