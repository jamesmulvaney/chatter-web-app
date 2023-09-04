/*
  Warnings:

  - You are about to drop the column `authorId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `recipientId` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `activeChats` on the `User` table. All the data in the column will be lost.
  - Added the required column `chatSessionId` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" DROP COLUMN "authorId",
DROP COLUMN "recipientId",
ADD COLUMN     "chatSessionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "activeChats";

-- CreateTable
CREATE TABLE "ChatSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatSessionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChatSessionToUser_AB_unique" ON "_ChatSessionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatSessionToUser_B_index" ON "_ChatSessionToUser"("B");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatSessionId_fkey" FOREIGN KEY ("chatSessionId") REFERENCES "ChatSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatSessionToUser" ADD CONSTRAINT "_ChatSessionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatSessionToUser" ADD CONSTRAINT "_ChatSessionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
