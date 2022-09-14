/*
  Warnings:

  - A unique constraint covering the columns `[ProductQuantityId]` on the table `ProductQuantity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductQuantity_ProductQuantityId_key" ON "ProductQuantity"("ProductQuantityId");
