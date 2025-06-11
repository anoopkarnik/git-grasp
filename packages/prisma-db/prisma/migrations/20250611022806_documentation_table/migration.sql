-- CreateTable
CREATE TABLE "github_schema"."Documentation" (
    "_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Documentation_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "github_schema"."Documentation" ADD CONSTRAINT "Documentation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
