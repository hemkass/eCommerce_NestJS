-- CreateEnum
CREATE TYPE "Morphology" AS ENUM ('A', 'V', 'X', 'H', 'O');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('clothes', 'teeShirt', 'femme', 'Homme', 'enfant', 'maternity');

-- CreateEnum
CREATE TYPE "StatusCart" AS ENUM ('PENDING', 'ABANDONED', 'PAID');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "morphology" "Morphology",
    "size" TEXT,
    "weight" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ownerProduct" (
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ownerProduct_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "AdressDelivery" (
    "adressDelId" SERIAL NOT NULL,
    "number" INTEGER,
    "street" TEXT,
    "postcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AdressDelivery_pkey" PRIMARY KEY ("adressDelId")
);

-- CreateTable
CREATE TABLE "AdressBill" (
    "adressBillId" SERIAL NOT NULL,
    "number" INTEGER,
    "street" TEXT,
    "postcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AdressBill_pkey" PRIMARY KEY ("adressBillId")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "title" CHAR(50) NOT NULL,
    "description" CHAR(160) NOT NULL,
    "brand" TEXT NOT NULL,
    "style" TEXT,
    "sustainableId" INTEGER NOT NULL,
    "DeliveryDate" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(7,2) NOT NULL DEFAULT 0.00,
    "color" TEXT NOT NULL,
    "size" "Size" NOT NULL,
    "quantity_available" INTEGER NOT NULL DEFAULT 0,
    "quantity_cart" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "favorite" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductsOnCart" (
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ProductsOnCart_pkey" PRIMARY KEY ("cartId","productId")
);

-- CreateTable
CREATE TABLE "ProductsCategories" (
    "id" SERIAL NOT NULL,
    "type" "Categories" NOT NULL,
    "product_CategoryId" TEXT NOT NULL,

    CONSTRAINT "ProductsCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sustainable" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "description" CHAR(160) NOT NULL,

    CONSTRAINT "Sustainable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPictures" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3),
    "productId" TEXT NOT NULL,
    "stylePicture" TEXT NOT NULL,
    "morphoPicture" "Morphology",
    "genderPicture" "Categories",
    "categoriesPicture" "Categories",
    "colorPicture" TEXT,
    "sizePicture" "Size",

    CONSTRAINT "ProductPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "title" CHAR(50) NOT NULL,
    "description" CHAR(160) NOT NULL,
    "useful" BOOLEAN NOT NULL,
    "rating_avg" DECIMAL(4,2) NOT NULL DEFAULT 0.00,
    "rating_quality" INTEGER NOT NULL DEFAULT 0,
    "rating_style" INTEGER NOT NULL DEFAULT 0,
    "rating_size" INTEGER NOT NULL DEFAULT 0,
    "ownerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewPictures" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "src" TEXT NOT NULL,
    "ReviewId" TEXT NOT NULL,

    CONSTRAINT "ReviewPictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "status" "StatusCart" NOT NULL,
    "delivery_fees" DECIMAL(7,2) NOT NULL DEFAULT 0.00,
    "total" DECIMAL(7,2) NOT NULL DEFAULT 0.00,
    "delivery_date" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdressDelivery_userId_key" ON "AdressDelivery"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AdressBill_userId_key" ON "AdressBill"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_cartId_key" ON "Payment"("cartId");

-- AddForeignKey
ALTER TABLE "ownerProduct" ADD CONSTRAINT "ownerProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ownerProduct" ADD CONSTRAINT "ownerProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdressDelivery" ADD CONSTRAINT "AdressDelivery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdressBill" ADD CONSTRAINT "AdressBill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sustainableId_fkey" FOREIGN KEY ("sustainableId") REFERENCES "Sustainable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCart" ADD CONSTRAINT "ProductsOnCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsOnCart" ADD CONSTRAINT "ProductsOnCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsCategories" ADD CONSTRAINT "ProductsCategories_product_CategoryId_fkey" FOREIGN KEY ("product_CategoryId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPictures" ADD CONSTRAINT "ProductPictures_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewPictures" ADD CONSTRAINT "ReviewPictures_ReviewId_fkey" FOREIGN KEY ("ReviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
