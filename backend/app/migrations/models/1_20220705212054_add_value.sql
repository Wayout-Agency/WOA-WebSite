-- upgrade --
ALTER TABLE "token" ADD "value" VARCHAR(600) NOT NULL;
-- downgrade --
ALTER TABLE "token" DROP COLUMN "value";
