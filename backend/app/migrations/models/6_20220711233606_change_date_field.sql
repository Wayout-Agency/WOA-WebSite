-- upgrade --
ALTER TABLE "article" ALTER COLUMN "created_at" DROP DEFAULT;
-- downgrade --
ALTER TABLE "article" ALTER COLUMN "created_at" SET DEFAULT '2022-07-11';
