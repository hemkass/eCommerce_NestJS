-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "update_at" TIMESTAMP(3),
ALTER COLUMN "free_delivery_amount" DROP DEFAULT;
