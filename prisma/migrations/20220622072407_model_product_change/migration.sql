/*
  Warnings:

  - The `genderPicture` column on the `ProductPictures` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categoriesPicture` column on the `ProductPictures` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ProductsCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductsCategories" DROP CONSTRAINT "ProductsCategories_product_CategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categories" TEXT[],
ALTER COLUMN "update_at" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "favorite" SET DEFAULT false;

-- AlterTable
ALTER TABLE "ProductPictures" DROP COLUMN "genderPicture",
ADD COLUMN     "genderPicture" TEXT,
DROP COLUMN "categoriesPicture",
ADD COLUMN     "categoriesPicture" TEXT;

-- DropTable
DROP TABLE "ProductsCategories";
