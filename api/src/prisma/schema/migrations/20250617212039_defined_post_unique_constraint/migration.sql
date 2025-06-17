/*
  Warnings:

  - A unique constraint covering the columns `[authorId,titleSlug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_authorId_titleSlug_key" ON "Post"("authorId", "titleSlug");
