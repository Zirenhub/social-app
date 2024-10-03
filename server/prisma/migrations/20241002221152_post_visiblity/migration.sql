/*
  Warnings:

  - Added the required column `visibility` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('EVERYONE', 'FRIENDS');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "visibility" "Visibility" NOT NULL;
