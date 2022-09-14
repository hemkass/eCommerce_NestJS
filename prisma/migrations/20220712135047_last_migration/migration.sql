/*
  Warnings:

  - The primary key for the `ProductsOnCart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedBy` on the `ProductsOnCart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AdressBill" DROP CONSTRAINT "AdressBill_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdressDelivery" DROP CONSTRAINT "AdressDelivery_userId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_quantityAvailableID_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sustainableId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPictures" DROP CONSTRAINT "ProductPictures_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCart" DROP CONSTRAINT "ProductsOnCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCart" DROP CONSTRAINT "ProductsOnCart_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewPictures" DROP CONSTRAINT "ReviewPictures_ReviewId_fkey";

-- DropForeignKey
ALTER TABLE "ownerProduct" DROP CONSTRAINT "ownerProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "ownerProduct" DROP CONSTRAINT "ownerProduct_userId_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "error_Messages" JSONB[],
ALTER COLUMN "update_at" DROP NOT NULL,
ALTER COLUMN "ownerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "update_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rating_avg" DECIMAL(4,2) NOT NULL DEFAULT 0.00;

-- AlterTable
ALTER TABLE "ProductsOnCart" DROP CONSTRAINT "ProductsOnCart_pkey",
DROP COLUMN "assignedBy",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "quantityInCart" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "size" TEXT,
ALTER COLUMN "cartId" DROP NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL,
ALTER COLUMN "assignedAt" DROP NOT NULL,
ADD CONSTRAINT "ProductsOnCart_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "update_at" DROP NOT NULL,
ALTER COLUMN "useful" SET DEFAULT false,
ALTER COLUMN "ownerId" DROP NOT NULL,
ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReviewPictures" ALTER COLUMN "update_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Sustainable" ALTER COLUMN "description" SET DATA TYPE CHAR(300);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN,
ADD COLUMN     "firstname" TEXT,
ADD COLUMN     "lastname" TEXT,
ADD COLUMN     "token" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_ownerId_key" ON "Payment"("ownerId");

-- AddForeignKey
ALTER TABLE "ownerProduct" ADD CONSTRAINT "ownerProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ownerProduct" ADD CONSTRAINT "ownerProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdressDelivery" ADD CONSTRAINT "AdressDelivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdressBill" ADD CONSTRAINT "AdressBill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_quantityAvailableID_fkey" FOREIGN KEY ("quantityAvailableID") REFERENCES "ProductQuantity"("QuantityID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sustainableId_fkey" FOREIGN KEY ("sustainableId") REFERENCES "Sustainable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPictures" ADD CONSTRAINT "ProductPictures_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewPictures" ADD CONSTRAINT "ReviewPictures_ReviewId_fkey" FOREIGN KEY ("ReviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCart" ADD CONSTRAINT "ProductsOnCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCart" ADD CONSTRAINT "ProductsOnCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
