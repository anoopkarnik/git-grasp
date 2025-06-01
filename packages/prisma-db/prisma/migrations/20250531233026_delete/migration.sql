-- DropForeignKey
ALTER TABLE "gitgrasp_schema"."Syllabus" DROP CONSTRAINT "Syllabus_projectId_fkey";

-- AddForeignKey
ALTER TABLE "gitgrasp_schema"."Syllabus" ADD CONSTRAINT "Syllabus_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "gitgrasp_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
