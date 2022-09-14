/*
  Warnings:

  - The primary key for the `AdressDelivery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adressDelId` on the `AdressDelivery` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `AdressDelivery` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstname` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AdressDelivery" DROP CONSTRAINT "AdressDelivery_userId_fkey";

-- DropIndex
DROP INDEX "AdressDelivery_userId_key";

-- AlterTable
ALTER TABLE "AdressDelivery" DROP CONSTRAINT "AdressDelivery_pkey",
DROP COLUMN "adressDelId",
DROP COLUMN "userId",
ADD COLUMN     "deliveryId" SERIAL NOT NULL,
ADD CONSTRAINT "AdressDelivery_pkey" PRIMARY KEY ("deliveryId");

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deliveryId" INTEGER,
ADD COLUMN     "stripeCustomerID" TEXT,
ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_userId_key" ON "Delivery"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "AdressDelivery"("deliveryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
