/*
  Warnings:

  - The `categories` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `brand` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `style` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[],
DROP COLUMN "brand",
ADD COLUMN     "brand" TEXT,
DROP COLUMN "style",
ADD COLUMN     "style" TEXT;
