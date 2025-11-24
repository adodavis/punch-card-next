/*
  Warnings:

  - You are about to drop the column `fighterATotalScore` on the `Fight` table. All the data in the column will be lost.
  - You are about to drop the column `fighterBTotalScore` on the `Fight` table. All the data in the column will be lost.

*/
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
    CONSTRAINT "Fight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Fight" ("createdAt", "fightDate", "fighterA", "fighterB", "id", "isChampionship", "numRounds", "outcome", "updatedAt", "userId", "winner", "winnerDisplay") SELECT "createdAt", "fightDate", "fighterA", "fighterB", "id", "isChampionship", "numRounds", "outcome", "updatedAt", "userId", "winner", "winnerDisplay" FROM "Fight";
DROP TABLE "Fight";
ALTER TABLE "new_Fight" RENAME TO "Fight";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
