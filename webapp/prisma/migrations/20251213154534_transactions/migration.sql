-- CreateTable
CREATE TABLE "StripeTransactions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "StripeTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StripeTransactions" ADD CONSTRAINT "StripeTransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
