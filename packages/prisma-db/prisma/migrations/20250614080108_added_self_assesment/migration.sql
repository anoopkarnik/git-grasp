-- CreateTable
CREATE TABLE "quiz_schema"."SelfAssessment" (
    "id" TEXT NOT NULL,
    "entityName" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SelfAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SelfAssessment_userId_entityName_entityType_key" ON "quiz_schema"."SelfAssessment"("userId", "entityName", "entityType");

-- AddForeignKey
ALTER TABLE "quiz_schema"."SelfAssessment" ADD CONSTRAINT "SelfAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
