/*
  Warnings:

  - You are about to drop the `GithubCommit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "gitgrasp_schema"."GithubCommit" DROP CONSTRAINT "GithubCommit_projectId_fkey";

-- DropTable
DROP TABLE "gitgrasp_schema"."GithubCommit";
