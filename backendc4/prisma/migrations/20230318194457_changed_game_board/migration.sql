/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_currentGameSessionID_fkey";

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "gameBoard" SET NOT NULL,
ALTER COLUMN "gameBoard" SET DATA TYPE TEXT,
ALTER COLUMN "isGameFinished" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "currentGameSessionID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_currentGameSessionID_fkey" FOREIGN KEY ("currentGameSessionID") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
