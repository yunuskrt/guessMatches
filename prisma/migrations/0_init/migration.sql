-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "league" TEXT,
    "date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

