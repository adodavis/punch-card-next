-- CreateTable
CREATE TABLE "Fight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fighterA" TEXT NOT NULL,
    "fighterB" TEXT NOT NULL,
    "numRounds" INTEGER NOT NULL,
    "fightDate" DATETIME NOT NULL,
    "isChampionship" BOOLEAN NOT NULL,
    "outcome" TEXT,
    "winner" TEXT,
    "winnerDisplay" TEXT,
    "fighterATotalScore" INTEGER NOT NULL DEFAULT 0,
    "fighterBTotalScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fightId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "fighterA" INTEGER NOT NULL,
    "fighterB" INTEGER NOT NULL,
    "notes" TEXT,
    "isClose" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Round_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
