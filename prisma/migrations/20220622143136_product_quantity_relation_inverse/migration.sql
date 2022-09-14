/*
  Warnings:

  - You are about to drop the column `ProductQuantityId` on the `ProductQuantity` table. All the data in the column will be lost.
  - Added the required column `quantityAvailableID` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductQuantity" DROP CONSTRAINT "ProductQuantity_ProductQuantityId_fkey";

-- DropIndex
DROP INDEX "ProductQuantity_ProductQuantityId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantityAvailableID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductQuantity" DROP COLUMN "ProductQuantityId";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_quantityAvailableID_fkey" FOREIGN KEY ("quantityAvailableID") REFERENCES "ProductQuantity"("QuantityID") ON DELETE RESTRICT ON UPDATE CASCADE;
