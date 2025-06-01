/*
  Warnings:

  - You are about to drop the column `level` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `totalQuestions` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gitgrasp_schema"."Quiz" DROP COLUMN "level",
DROP COLUMN "type",
ADD COLUMN     "totalQuestions" INTEGER NOT NULL;
