-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_ownerId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "rating_avg" SET DEFAULT '0.00',
ALTER COLUMN "rating_avg" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
