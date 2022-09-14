/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deliveryId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cartId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_date` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_type` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Delivery_type" AS ENUM ('CollectInStore', 'HomeDelivery', 'FastDelivery');

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "cartId" TEXT NOT NULL,
ADD COLUMN     "delivery_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "delivery_fees" DECIMAL(7,2) NOT NULL DEFAULT 0.00,
ADD COLUMN     "delivery_type" "Delivery_type" NOT NULL,
ADD COLUMN     "free_delivery_amount" DECIMAL(7,2) DEFAULT 0.00,
ADD COLUMN     "total" DECIMAL(7,2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "deliveryId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_cartId_key" ON "Delivery"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_deliveryId_key" ON "Payment"("deliveryId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
