-- CreateEnum
CREATE TYPE "public"."StatusEnum" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."UserTypeEnum" AS ENUM ('CLIENT', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "address" TEXT,
    "zipCode" TEXT,
    "gender" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "accountPassword" TEXT,
    "status" "public"."StatusEnum" NOT NULL DEFAULT 'PENDING',
    "main_location" TEXT,
    "instagram_account" TEXT,
    "average_day_rate_currency" TEXT,
    "interests" TEXT,
    "bio" TEXT,
    "clients" TEXT,
    "user_type" "public"."UserTypeEnum" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
