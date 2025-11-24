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
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Fight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Fight" ("createdAt", "fightDate", "fighterA", "fighterB", "id", "isChampionship", "numRounds", "outcome", "updatedAt", "userId", "winner", "winnerDisplay") SELECT "createdAt", "fightDate", "fighterA", "fighterB", "id", "isChampionship", "numRounds", "outcome", "updatedAt", "userId", "winner", "winnerDisplay" FROM "Fight";
DROP TABLE "Fight";
ALTER TABLE "new_Fight" RENAME TO "Fight";
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fightId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "fighterA" INTEGER NOT NULL,
    "fighterB" INTEGER NOT NULL,
    "notes" TEXT,
    "isClose" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Round_fightId_fkey" FOREIGN KEY ("fightId") REFERENCES "Fight" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("createdAt", "fightId", "fighterA", "fighterB", "id", "index", "isClose", "notes", "updatedAt") SELECT "createdAt", "fightId", "fighterA", "fighterB", "id", "index", "isClose", "notes", "updatedAt" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
