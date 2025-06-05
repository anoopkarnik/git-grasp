-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "financial_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "github_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "quiz_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user_schema";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "financial_schema"."UserPurchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_schema"."UserFinancial" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserFinancial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "github_schema"."GithubProject" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubProject_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "github_schema"."UserToGithubProject" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "githubProjectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserToGithubProject_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "github_schema"."Question" (
    "_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileReferences" JSONB,
    "projectId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "github_schema"."SourceCodeEmbedding" (
    "_id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "summaryEmbedding" vector(1536),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceCodeEmbedding_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "quiz_schema"."Syllabus" (
    "_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Syllabus_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "quiz_schema"."Topic" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "subTopic" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "framework" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "syllabusId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "quiz_schema"."Quiz" (
    "_id" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "topicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "quiz_schema"."QuizQuestion" (
    "_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'subjective',
    "chosenAnswer" TEXT,
    "score" INTEGER,
    "scoreMax" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "user_schema"."User" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "bannedReason" TEXT,
    "banExpires" INTEGER,
    "creditsUsed" INTEGER NOT NULL DEFAULT 0,
    "creditsTotal" INTEGER NOT NULL DEFAULT 2000,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "user_schema"."Account" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "idToken" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "user_schema"."Session" (
    "_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "impersonatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "user_schema"."Verification" (
    "_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "user_schema"."jwks" (
    "_id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jwks_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "user_schema"."Connection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Connection',
    "description" TEXT,
    "connection" TEXT,
    "type" TEXT NOT NULL,
    "details" TEXT NOT NULL DEFAULT '{}',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserFinancial_userId_key" ON "financial_schema"."UserFinancial"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserToGithubProject_userId_githubProjectId_key" ON "github_schema"."UserToGithubProject"("userId", "githubProjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Syllabus_projectId_key" ON "quiz_schema"."Syllabus"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user_schema"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_userId_name_key" ON "user_schema"."Connection"("userId", "name");

-- AddForeignKey
ALTER TABLE "github_schema"."UserToGithubProject" ADD CONSTRAINT "UserToGithubProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."UserToGithubProject" ADD CONSTRAINT "UserToGithubProject_githubProjectId_fkey" FOREIGN KEY ("githubProjectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."Question" ADD CONSTRAINT "Question_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "github_schema"."SourceCodeEmbedding" ADD CONSTRAINT "SourceCodeEmbedding_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_schema"."Syllabus" ADD CONSTRAINT "Syllabus_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "github_schema"."GithubProject"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_schema"."Topic" ADD CONSTRAINT "Topic_syllabusId_fkey" FOREIGN KEY ("syllabusId") REFERENCES "quiz_schema"."Syllabus"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_schema"."Quiz" ADD CONSTRAINT "Quiz_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "quiz_schema"."Topic"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_schema"."Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_schema"."QuizQuestion" ADD CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz_schema"."Quiz"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schema"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schema"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_schema"."Connection" ADD CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema"."User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
