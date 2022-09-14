/*
  Warnings:

  - You are about to alter the column `delivery_fees` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,2)` to `Integer`.
  - You are about to alter the column `total` on the `Cart` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,2)` to `Integer`.
  - You are about to alter the column `delivery_fees` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,2)` to `Integer`.
  - You are about to alter the column `free_delivery_amount` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,2)` to `Integer`.
  - You are about to alter the column `total` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,2)` to `Integer`.
  - You are about to drop the column `quantityAvailableID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sustainableId` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,2)` to `Integer`.
  - You are about to alter the column `rating_avg` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Integer`.
  - You are about to alter the column `rating_avg` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Integer`.
  - A unique constraint covering the columns `[ProductQuantityId]` on the table `ProductQuantity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sustainableId]` on the table `Sustainable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_quantityAvailableID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sustainableId_fkey";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "delivery_fees" SET DEFAULT 0,
ALTER COLUMN "delivery_fees" SET DATA TYPE INTEGER,
ALTER COLUMN "total" SET DEFAULT 0,
ALTER COLUMN "total" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "delivery_fees" SET DEFAULT 0,
ALTER COLUMN "delivery_fees" SET DATA TYPE INTEGER,
ALTER COLUMN "free_delivery_amount" SET DATA TYPE INTEGER,
ALTER COLUMN "total" SET DEFAULT 0,
ALTER COLUMN "total" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantityAvailableID",
DROP COLUMN "sustainableId",
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "rating_avg" SET DEFAULT 0,
ALTER COLUMN "rating_avg" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ProductQuantity" ADD COLUMN     "ProductQuantityId" TEXT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "rating_avg" SET DEFAULT 0,
ALTER COLUMN "rating_avg" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Sustainable" ADD COLUMN     "sustainableId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ProductQuantity_ProductQuantityId_key" ON "ProductQuantity"("ProductQuantityId");

-- CreateIndex
CREATE UNIQUE INDEX "Sustainable_sustainableId_key" ON "Sustainable"("sustainableId");

-- AddForeignKey
ALTER TABLE "ProductQuantity" ADD CONSTRAINT "ProductQuantity_ProductQuantityId_fkey" FOREIGN KEY ("ProductQuantityId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sustainable" ADD CONSTRAINT "Sustainable_sustainableId_fkey" FOREIGN KEY ("sustainableId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
