-- upgrade --
ALTER TABLE "article" ADD "blocks" TEXT NOT NULL;
ALTER TABLE "article" ADD "introduction" TEXT NOT NULL;
ALTER TABLE "article" DROP COLUMN "text";
-- downgrade --
ALTER TABLE "article" ADD "text" TEXT NOT NULL;
ALTER TABLE "article" DROP COLUMN "blocks";
ALTER TABLE "article" DROP COLUMN "introduction";
