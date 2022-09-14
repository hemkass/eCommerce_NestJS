/*
  Warnings:

  - The `style` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `brand` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
ADD COLUMN     "brand" "Brand" NOT NULL,
DROP COLUMN "style",
ADD COLUMN     "style" "Style";
