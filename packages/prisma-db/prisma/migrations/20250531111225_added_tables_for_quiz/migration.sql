/*
  Warnings:

  - You are about to drop the `UserFinancial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "gitgrasp_schema"."UserFinancial";

-- CreateTable
CREATE TABLE "gitgrasp_schema"."Syllabus" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Syllabus_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "gitgrasp_schema"."Topic" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "syllabusId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "gitgrasp_schema"."Quiz" (
    "_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "score" INTEGER,
    "scoreMax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "topicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "gitgrasp_schema"."QuizQuestion" (
    "_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "chosenAnswer" TEXT,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Syllabus_projectId_key" ON "gitgrasp_schema"."Syllabus"("projectId");

-- AddForeignKey
ALTER TABLE "gitgrasp_schema"."Syllabus" ADD CONSTRAINT "Syllabus_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "gitgrasp_schema"."GithubProject"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gitgrasp_schema"."Topic" ADD CONSTRAINT "Topic_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "gitgrasp_schema"."Syllabus"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gitgrasp_schema"."Quiz" ADD CONSTRAINT "Quiz_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "gitgrasp_schema"."Topic"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gitgrasp_schema"."Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "gitgrasp_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gitgrasp_schema"."QuizQuestion" ADD CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "gitgrasp_schema"."Quiz"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
