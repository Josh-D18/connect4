/*
  Warnings:

  - You are about to drop the column `currentGameID` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gameCreationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currentGameSessionID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_currentGameID_fkey";

-- DropIndex
DROP INDEX "User_gameId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "currentGameID";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gameId",
ADD COLUMN     "currentGameSessionID" INTEGER NOT NULL,
ADD COLUMN     "gameCreationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_gameCreationId_key" ON "User"("gameCreationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentGameSessionID_fkey" FOREIGN KEY ("currentGameSessionID") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
