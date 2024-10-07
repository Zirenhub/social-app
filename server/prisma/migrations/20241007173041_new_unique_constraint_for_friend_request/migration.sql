/*
  Warnings:

  - The values [REJECTED] on the enum `FriendRequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[receiverId,senderId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,userId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendRequestStatus_new" AS ENUM ('PENDING', 'ACCEPTED');
ALTER TABLE "FriendRequest" ALTER COLUMN "status" TYPE "FriendRequestStatus_new" USING ("status"::text::"FriendRequestStatus_new");
ALTER TYPE "FriendRequestStatus" RENAME TO "FriendRequestStatus_old";
ALTER TYPE "FriendRequestStatus_new" RENAME TO "FriendRequestStatus";
DROP TYPE "FriendRequestStatus_old";
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_receiverId_senderId_key" ON "FriendRequest"("receiverId", "senderId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_id_userId_key" ON "Profile"("id", "userId");
