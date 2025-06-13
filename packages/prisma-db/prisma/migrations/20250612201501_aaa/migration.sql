-- AlterTable
ALTER TABLE "quiz_schema"."QuizQuestion" ADD COLUMN     "options" TEXT[] DEFAULT ARRAY[]::TEXT[];
