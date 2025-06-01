/*
  Warnings:

  - Added the required column `framework` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTopic` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gitgrasp_schema"."Topic" ADD COLUMN     "framework" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "subTopic" TEXT NOT NULL;
