-- AlterTable
ALTER TABLE "quiz_schema"."Quiz" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'processing';

-- AlterTable
ALTER TABLE "quiz_schema"."Syllabus" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'processing';
