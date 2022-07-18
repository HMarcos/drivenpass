/*
  Warnings:

  - Changed the type of `type` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credito', 'debito', 'ambos');

-- AlterTable
ALTER TABLE "cards" ALTER COLUMN "securityCode" SET DATA TYPE TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "CardType" NOT NULL;
