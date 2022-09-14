/*
  Warnings:

  - The `categories` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `style` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categories",
ADD COLUMN     "categories" "Categories"[],
DROP COLUMN "style",
ADD COLUMN     "style" "Style";
