-- DropForeignKey
ALTER TABLE "ProductQuantity" DROP CONSTRAINT "ProductQuantity_ProductQuantityId_fkey";

-- AlterTable
ALTER TABLE "ProductQuantity" ALTER COLUMN "ProductQuantityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductQuantity" ADD CONSTRAINT "ProductQuantity_ProductQuantityId_fkey" FOREIGN KEY ("ProductQuantityId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
