/*
  Warnings:

  - You are about to drop the column `score` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `scoreMax` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `isCorrect` on the `QuizQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gitgrasp_schema"."Quiz" DROP COLUMN "score",
DROP COLUMN "scoreMax";

-- AlterTable
ALTER TABLE "gitgrasp_schema"."QuizQuestion" DROP COLUMN "isCorrect",
ADD COLUMN     "score" INTEGER,
ADD COLUMN     "scoreMax" INTEGER;
