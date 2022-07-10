-- upgrade --
CREATE UNIQUE INDEX "uid_user_login_a18ea9" ON "user" ("login");
-- downgrade --
DROP INDEX "idx_user_login_a18ea9";
