-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "gameId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "winner" TEXT,
    "playerTurn" INTEGER NOT NULL,
    "gameBoard" JSONB[],
    "isGameFinished" BOOLEAN NOT NULL,
    "currentGameID" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_gameId_key" ON "User"("gameId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_currentGameID_fkey" FOREIGN KEY ("currentGameID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
