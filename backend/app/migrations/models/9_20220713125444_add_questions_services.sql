-- upgrade --
CREATE TABLE IF NOT EXISTS "questionservice" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(500) NOT NULL,
    "text" VARCHAR(500) NOT NULL,
    "type" VARCHAR(8) NOT NULL
);
COMMENT ON COLUMN "questionservice"."type" IS 'question: question\nservice: service';
-- downgrade --
DROP TABLE IF EXISTS "questionservice";
