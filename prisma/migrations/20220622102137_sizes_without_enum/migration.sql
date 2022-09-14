/*
  Warnings:

  - You are about to drop the column `quantity_available` on the `Product` table. All the data in the column will be lost.
  - The `size` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantity_available",
DROP COLUMN "size",
ADD COLUMN     "size" TEXT[];

-- CreateTable
CREATE TABLE "ProductQuantity" (
    "QuantityID" SERIAL NOT NULL,
    "ProductQuantityId" TEXT NOT NULL,
    "XXS" INTEGER DEFAULT 0,
    "XS" INTEGER DEFAULT 0,
    "S" INTEGER DEFAULT 0,
    "M" INTEGER DEFAULT 0,
    "L" INTEGER DEFAULT 0,
    "XL" INTEGER DEFAULT 0,
    "XXL" INTEGER DEFAULT 0,
    "XXXL" INTEGER DEFAULT 0,

    CONSTRAINT "ProductQuantity_pkey" PRIMARY KEY ("QuantityID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductQuantity_ProductQuantityId_key" ON "ProductQuantity"("ProductQuantityId");

-- AddForeignKey
ALTER TABLE "ProductQuantity" ADD CONSTRAINT "ProductQuantity_ProductQuantityId_fkey" FOREIGN KEY ("ProductQuantityId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
