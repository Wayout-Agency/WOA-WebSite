-- upgrade --
ALTER TABLE "token" ADD "owner" VARCHAR(200) NOT NULL;
-- downgrade --
ALTER TABLE "token" DROP COLUMN "owner";
