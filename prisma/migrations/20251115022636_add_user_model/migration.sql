-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fight" (
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
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Fight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Fight" ("createdAt", "fightDate", "fighterA", "fighterATotalScore", "fighterB", "fighterBTotalScore", "id", "isChampionship", "numRounds", "outcome", "updatedAt", "winner", "winnerDisplay") SELECT "createdAt", "fightDate", "fighterA", "fighterATotalScore", "fighterB", "fighterBTotalScore", "id", "isChampionship", "numRounds", "outcome", "updatedAt", "winner", "winnerDisplay" FROM "Fight";
DROP TABLE "Fight";
ALTER TABLE "new_Fight" RENAME TO "Fight";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
