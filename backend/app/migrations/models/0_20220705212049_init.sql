-- upgrade --
CREATE TABLE IF NOT EXISTS "article" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(300) NOT NULL,
    "autor" VARCHAR(200) NOT NULL,
    "created_at" DATE NOT NULL  DEFAULT '2022-07-05',
    "time_to_read" SMALLINT NOT NULL,
    "link" VARCHAR(200) NOT NULL,
    "text" TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "album" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "title" VARCHAR(300) NOT NULL,
    "description" TEXT NOT NULL,
    "new_price" INT NOT NULL,
    "old_price" INT NOT NULL,
    "sale_text" VARCHAR(300) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "price_include" VARCHAR(500) NOT NULL,
    "model_description" VARCHAR(500) NOT NULL
);
CREATE TABLE IF NOT EXISTS "user" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "login" VARCHAR(100) NOT NULL,
    "password" VARCHAR(300) NOT NULL
);
CREATE TABLE IF NOT EXISTS "token" (
    "id" SERIAL NOT NULL PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS "aerich" (
    "id" SERIAL NOT NULL PRIMARY KEY,
    "version" VARCHAR(255) NOT NULL,
    "app" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL
);
