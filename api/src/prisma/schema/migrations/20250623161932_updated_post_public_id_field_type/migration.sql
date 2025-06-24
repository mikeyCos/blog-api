/*
  Warnings:

  - The `publicId` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "publicId",
ADD COLUMN     "publicId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_publicId_key" ON "Post"("publicId");
