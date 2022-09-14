-- DropIndex
DROP INDEX "ProductQuantity_ProductQuantityId_key";

-- AlterTable
ALTER TABLE "Sustainable" ALTER COLUMN "description" DROP NOT NULL;
