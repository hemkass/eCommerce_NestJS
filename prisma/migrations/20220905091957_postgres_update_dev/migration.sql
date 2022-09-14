/*
  Warnings:

  - The values [maternity] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.
  - The `categories` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Clothes', 'Women', 'Men');

-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('clothes', 'teeShirt', 'femme', 'Homme', 'enfant');
ALTER TABLE "Product" ALTER COLUMN "categories" TYPE "Categories_new"[] USING ("categories"::text::"Categories_new"[]);
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categories",
ADD COLUMN     "categories" "Categories"[];
