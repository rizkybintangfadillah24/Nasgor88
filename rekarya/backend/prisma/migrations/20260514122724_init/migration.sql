-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MAHASISWA', 'UMKM', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DemoRequestStatus" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CollaborationStatus" AS ENUM ('WAITING', 'APPROVED', 'REJECTED', 'DONE');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'REVIEW', 'PAID');

-- CreateEnum
CREATE TYPE "MentoringStatus" AS ENUM ('ONGOING', 'DONE');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('REGISTER', 'LOGIN', 'UPDATE_PROFILE', 'UPLOAD_PRODUCT', 'VERIFY_USER', 'VERIFY_PRODUCT', 'REQUEST_DEMO', 'UPDATE_DEMO_REQUEST', 'CREATE_COLLABORATION', 'UPDATE_COLLABORATION', 'CREATE_OFFER', 'UPDATE_OFFER', 'CREATE_TRANSACTION', 'UPDATE_TRANSACTION', 'CREATE_MENTORING', 'UPDATE_MENTORING', 'CREATE_REVIEW', 'MANAGE_CATEGORY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "verificationStatus" "UserVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "verifiedById" INTEGER,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mahasiswa_profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT,
    "phone" TEXT,
    "bankAccount" TEXT,
    "campus" TEXT,
    "major" TEXT,
    "studyProgram" TEXT,
    "educationStatus" TEXT,
    "bio" TEXT,
    "photo" TEXT,
    "studentCard" TEXT,
    "identityCard" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mahasiswa_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "umkm_profiles" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ownerName" TEXT,
    "businessName" TEXT,
    "businessType" TEXT,
    "description" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "mainProblem" TEXT,
    "specificNeeds" TEXT,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "targetDuration" INTEGER,
    "mentoringPreference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "umkm_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainProblem" TEXT NOT NULL,
    "problemDetail" TEXT,
    "targetBusiness" TEXT NOT NULL,
    "mainFeatures" TEXT NOT NULL,
    "featureDetail" TEXT NOT NULL,
    "technology" TEXT NOT NULL,
    "trainingDuration" INTEGER NOT NULL,
    "mentoringMethod" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "screenshot" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'PENDING',
    "verificationNote" TEXT,
    "verifiedById" INTEGER,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demo_requests" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "umkmId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "message" TEXT,
    "requestedAt" TIMESTAMP(3),
    "status" "DemoRequestStatus" NOT NULL DEFAULT 'WAITING',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "demo_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collaborations" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "umkmId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "message" TEXT,
    "status" "CollaborationStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collaborations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "collaborationId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "umkmId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "note" TEXT,
    "status" "OfferStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "collaborationId" INTEGER NOT NULL,
    "offerId" INTEGER,
    "umkmId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentoring" (
    "id" SERIAL NOT NULL,
    "collaborationId" INTEGER NOT NULL,
    "umkmId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "schedule" TIMESTAMP(3),
    "progress" TEXT NOT NULL,
    "note" TEXT,
    "status" "MentoringStatus" NOT NULL DEFAULT 'ONGOING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "collaborationId" INTEGER NOT NULL,
    "umkmId" INTEGER NOT NULL,
    "mahasiswaId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "type" "ActivityType" NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mahasiswa_profiles_userId_key" ON "mahasiswa_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "umkm_profiles_userId_key" ON "umkm_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mahasiswa_profiles" ADD CONSTRAINT "mahasiswa_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "umkm_profiles" ADD CONSTRAINT "umkm_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demo_requests" ADD CONSTRAINT "demo_requests_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demo_requests" ADD CONSTRAINT "demo_requests_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demo_requests" ADD CONSTRAINT "demo_requests_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborations" ADD CONSTRAINT "collaborations_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring" ADD CONSTRAINT "mentoring_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring" ADD CONSTRAINT "mentoring_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring" ADD CONSTRAINT "mentoring_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "collaborations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_umkmId_fkey" FOREIGN KEY ("umkmId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
