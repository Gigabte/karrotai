-- CreateTable
CREATE TABLE "Promoter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "commission" REAL NOT NULL DEFAULT 20.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "promoterId" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Click_promoterId_fkey" FOREIGN KEY ("promoterId") REFERENCES "Promoter" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WaitlistUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "referralCode" TEXT,
    "promoterId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WaitlistUser_promoterId_fkey" FOREIGN KEY ("promoterId") REFERENCES "Promoter" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Promoter_email_key" ON "Promoter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Promoter_referralCode_key" ON "Promoter"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistUser_email_key" ON "WaitlistUser"("email");
