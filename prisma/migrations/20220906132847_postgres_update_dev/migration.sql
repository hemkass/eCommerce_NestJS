/*
  Warnings:

  - The values [clothes,teeShirt,femme,enfant] on the enum `Categories` will be removed. If these variants are still used in the database, this will fail.
  - The `brand` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Categories_new" AS ENUM ('Vetements', 'TeeShirt', 'Femme', 'Homme', 'Enfant');
ALTER TYPE "Categories" RENAME TO "Categories_old";
ALTER TYPE "Categories_new" RENAME TO "Categories";
DROP TYPE "Categories_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
ADD COLUMN     "brand" "Brand";
